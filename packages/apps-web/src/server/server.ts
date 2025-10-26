import fs from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';

import { appRequestListener } from './app';
import { staticRequestListener } from './static';
import { RequestListener } from './util';

let watchRes: http.ServerResponse | undefined = undefined;

export const createServer = (requestListener: RequestListener = appRequestListener) =>
{
  let finalRequestListener = requestListener;
  if (process.env.ENVIRONMENT === 'dev')
  {
    finalRequestListener = (req, res, secure) =>
    {
      if (req.url === '/live-reload')
      {
        if (watchRes) watchRes.end();
        watchRes = res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });
        return;
      }

      requestListener(req, res, secure);
    };
  }

  const keyPath = `/etc/letsencrypt/live/${process.env.HOST}/privkey.pem`;
  const certPath = `/etc/letsencrypt/live/${process.env.HOST}/fullchain.pem`;
  const secure = fs.existsSync(keyPath) && fs.existsSync(certPath);
  const port = process.env.PORT ?? 80;

  if (!secure)
  {
    http.createServer((req, res) => finalRequestListener(req, res, secure)).listen(port);
    console.log(`server running on port ${port}`);
  }
  else
  {
    http.createServer((req, res) =>
    {
      if (!req.url?.startsWith('/.well-known/acme-challenge/'))
      {
        res.writeHead(301, { Location: `https://${process.env.HOST}${req.url}` });
        res.end();
        return;
      }

      staticRequestListener(req, res, secure);
    }).listen(80);
    console.log('redirect server running on port 80');

    const options: https.ServerOptions =
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    };

    https.createServer(options, (req, res) => finalRequestListener(req, res, secure)).listen(443);
    console.log('server running on port 443');
  }

  if (process.env.ENVIRONMENT === 'dev')
  {
    fs.watch('.', { recursive: true }, (event: fs.WatchEventType, filename: string | null) =>
    {
      if (!watchRes) return;
      watchRes.write(`event: ${event}\ndata: ${filename}\n\n`);
    });

    console.log('watching project folder...');
  }
};
