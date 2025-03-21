import fs from 'fs';
import http from 'http';

import { bundle } from './bundle';

const mimeTypes: Record<string, string> =
{
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpg': 'image/jpg',
  'json': 'application/json',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'txt': 'text/plain'
};

let watchRes: http.ServerResponse | undefined = undefined;

export const runDevServer = async () =>
{
  http.createServer(async (req, res) =>
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

    const staticFilePath = `static${req.url}`;
    if (fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).isFile())
    {
      res.writeHead(200, {
        'Cache-Control': 'no-store',
        'Content-Type': mimeTypes[staticFilePath.split('.').pop() ?? 'txt']
      });
      res.end(fs.readFileSync(staticFilePath));
      return;
    }

    const includeLayout = !req.url?.endsWith('.page.html');
    const htmlPath = req.url === '/' ? '/index' : req.url?.replace(/\.html$/, '').replace(/\.page$/, '');

    try
    {
      const pageModulePath = `${process.cwd()}/src/templates${htmlPath}/page`;
      delete require.cache[require.resolve(pageModulePath)];
      const { default: renderPageHTML } = await import(pageModulePath);

      if (includeLayout)
      {
        try
        {
          const layoutModulePath = `${process.cwd()}/src/templates/layout`;
          delete require.cache[require.resolve(layoutModulePath)];
          const { default: renderLayoutHTML } = await import(layoutModulePath);

          const { js, css } = await bundle();

          res.writeHead(200, { 'Cache-Control': 'no-store' });
          res.end(renderLayoutHTML(js, css, await renderPageHTML()));
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any)
        {
          if (err.code !== 'MODULE_NOT_FOUND') throw err;
          console.log('layout template not found');
        }
      }

      res.writeHead(200, { 'Cache-Control': 'no-store' });
      res.end(await renderPageHTML());
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any)
    {
      if (err.code !== 'MODULE_NOT_FOUND') throw err;
    }

    res.statusCode = 404;
    res.end();
  }).listen(5551);

  const watch = (event: fs.WatchEventType, filename: string | null) =>
  {
    if (watchRes)
    {
      if (filename?.endsWith('.ts'))
      {
        const modulePath = `${process.cwd()}/src/${filename.substring(0, filename.lastIndexOf('.'))}`;
        delete require.cache[require.resolve(modulePath)];
      }

      watchRes.write(`event: ${event}\ndata: ${filename}\n\n`);
    }
  };

  fs.watch('src', { recursive: true }, watch);
  fs.watch('static', { recursive: true }, watch);

  console.log('dev server running at http://localhost:5551');
  console.log('  watching  src folder...');
  console.log('  watching  static folder...');
};
