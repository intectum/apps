import http from 'http';

import * as esbuild from 'esbuild';

import options from './options';

export const runDevServer = async () =>
{
  const context = await esbuild.context({ ...options, sourcemap: 'linked' });

  context.watch();
  const { host, port } = await context.serve({ servedir: 'dist' });

  http.createServer((req, res) =>
  {
    const options: http.RequestOptions =
    {
      hostname: host,
      port,
      path: req.url,
      method: req.method,
      headers: req.headers
    };

    proxy(req, res, options);
  }).listen(5551);

  console.log('dev server running at http://localhost:5551');
  console.log('  watching  src/index.ts and its dependencies...');
  console.log('  watching  src/index.css and its dependencies...');
};

const proxy = (req: http.IncomingMessage, res: http.ServerResponse, options: http.RequestOptions) =>
{
  const proxyReq = http.request(options, proxyRes =>
  {
    if (proxyRes.statusCode === 404)
    {
      if (options.path && !options.path.endsWith('html'))
      {
        proxy(req, res, { ...options, path: `${options.path}.html` });
      }
      else
      {
        res.writeHead(404);
        res.end(`${options.path} not found`);
      }

      return;
    }

    res.writeHead(proxyRes.statusCode as number, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });
};
