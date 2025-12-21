import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

import { bundle } from '../tools/bundle';
import { staticRequestListener } from './static';
import { respond, toUrl } from './util';

const responseHeaders = process.env.NODE_ENV === 'development' ? { 'Cache-Control': 'no-store' } : undefined;

const errorHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Based Dev</title>
      <script>
        new EventSource('/live-reload').addEventListener('change', () => location.reload())
      </script>
    </head>
    <body>
      <h1>Based Dev</h1>
      <p>Failed to render. See console for error details.</p>
    </body>
  </html>
`;

fs.rmSync('page-cache', { recursive: true, force: true });

export const appRequestListener = async (req: http.IncomingMessage, res: http.ServerResponse, layoutModule: string, pageModules: Record<string, string>, bundleEntryPoints: string[]) =>
{
  const url = toUrl(req);
  const pathname = normalizePathname(url.pathname);
  const pageOnly = pathname.endsWith('.page.html');

  const pagePath = pathname.replace(/\.html$/, '').replace(/\.page$/, '');
  if (!(pagePath in pageModules)) return false;

  const cachedFilePath = `page-cache${pathname}`;
  if (process.env.NODE_ENV !== 'development' && fs.existsSync(cachedFilePath))
  {
    req.url = pathname;
    return staticRequestListener(req, res, 'page-cache');
  }

  try
  {
    const pageModulePath = `${process.cwd()}/${pageModules[pagePath]}`;
    if (process.env.NODE_ENV === 'development') invalidateModuleRecursive(require.resolve(pageModulePath));
    const { default: renderPageHTML } = await import(pageModulePath);

    if (!pageOnly)
    {
      try
      {
        const layoutModulePath = `${process.cwd()}/${layoutModule}`;
        if (process.env.NODE_ENV === 'development') invalidateModuleRecursive(require.resolve(layoutModulePath));
        const { default: renderLayoutHTML } = await import(layoutModulePath);

        const { js, css } = await bundle(bundleEntryPoints);

        const layout = renderLayoutHTML(js, css, await renderPageHTML(pagePath));
        if (process.env.NODE_ENV !== 'development')
        {
          fs.mkdirSync(path.dirname(cachedFilePath), { recursive: true });
          fs.writeFileSync(cachedFilePath, layout);
        }

        respond(res, 200, layout, 'text/html', responseHeaders);
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (err: any)
      {
        if (err.code !== 'MODULE_NOT_FOUND') throw err;
        console.log('layout template not found');
      }
    }

    const page = await renderPageHTML(pagePath);
    if (process.env.NODE_ENV !== 'development')
    {
      fs.mkdirSync(path.dirname(cachedFilePath), { recursive: true });
      fs.writeFileSync(cachedFilePath, page);
    }

    respond(res, 200, page, 'text/html', responseHeaders);
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any)
  {
    if (err.code !== 'MODULE_NOT_FOUND')
    {
      if (process.env.NODE_ENV === 'development')
      {
        respond(res, 200, errorHTML, 'text/html', responseHeaders);
      }
      else
      {
        respond(res, 500);
      }

      console.log(err);
      return true;
    }
  }

  return false;
};

const normalizePathname = (pathname: string) =>
{
  if (pathname === '/') return '/index.html';
  if (path.extname(pathname) !== '.html') return `${pathname}.html`;
  return pathname;
};

const invalidateModuleRecursive = (fileName: string, maxDepth = 64) =>
{
  if (!maxDepth) return;

  const module = require.cache[fileName];
  if (!module) return;

  for (const childModule of module.children)
  {
    invalidateModuleRecursive(childModule.id, maxDepth - 1);
  }

  delete require.cache[fileName];
};
