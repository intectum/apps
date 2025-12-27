import fs from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';

import { staticRequestListener } from './static';
import { respond } from './util';

let watchRes: http.ServerResponse | undefined = undefined;

export type RequestListener = (req: http.IncomingMessage, res: http.ServerResponse, secure?: boolean) => Promise<boolean>;

export const createServer = (requestListener: RequestListener) =>
{
  const finalRequestListener: RequestListener = async (req, res, secure) =>
  {
    if (process.env.NODE_ENV === 'development' && req.url === '/live-reload')
    {
      if (watchRes) watchRes.end();
      watchRes = res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });
      return true;
    }

    if (!(await requestListener(req, res, secure)))
    {
      respond(res, 404);
    }

    return true;
  };

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
        respond(res, 301, undefined, undefined, { Location: `https://${process.env.HOST}${req.url}` });
        return true;
      }

      return staticRequestListener(req, res);
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

  if (process.env.NODE_ENV === 'development')
  {
    const watchListener = (event: fs.WatchEventType, filename: string | null) =>
    {
      if (!watchRes) return;
      watchRes.write(`event: ${event}\ndata: ${filename}\n\n`);
    };

    fs.watch('src', { recursive: true }, watchListener);
    console.log('watching src folder...');

    if (fs.existsSync('static'))
    {
      fs.watch('static', { recursive: true }, watchListener);
      console.log('watching static folder...');
    }
  }
};
