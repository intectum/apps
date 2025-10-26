import fs from 'node:fs';
import path from 'node:path';

import { bundle } from '../tools/bundle';
import { staticRequestListener } from './static';
import { RequestListener, respond, toFilePath, toUrl } from './util';

const layoutModulePath = `${process.cwd()}/src/app/layout`;
const responseHeaders = process.env.NODE_ENV === 'dev' ? { 'Cache-Control': 'no-store' } : undefined;

const errorHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Dev Server</title>
      <script>
        new EventSource('/live-reload').addEventListener('change', () => location.reload())
      </script>
    </head>
    <body>
      <h1>Dev Mode</h1>
      <p>Failed to render. See console for error details.</p>
    </body>
  </html>
`;

fs.rmSync('page-cache', { recursive: true, force: true });

export const pageRequestListener: RequestListener = async (req, res, secure) =>
{
  const url = toUrl(req, secure);
  const filePath = toFilePath(url);
  const cachedFilePath = `page-cache${filePath}`;
  if (process.env.NODE_ENV !== 'dev' && fs.existsSync(cachedFilePath))
  {
    staticRequestListener(req, res, secure, 'page-cache');
    return;
  }

  const includeLayout = !filePath.endsWith('.page.html');
  const pageModulePath = `${process.cwd()}/src/app/pages${filePath.replace(/\.html$/, '').replace(/\.page$/, '')}/index`;

  try
  {
    if (process.env.NODE_ENV === 'dev') invalidateModuleRecursive(require.resolve(pageModulePath));
    const { default: renderPageHTML } = await import(pageModulePath);

    if (includeLayout)
    {
      try
      {
        if (process.env.NODE_ENV === 'dev') invalidateModuleRecursive(require.resolve(layoutModulePath));
        const { default: renderLayoutHTML } = await import(layoutModulePath);

        const { js, css } = await bundle();

        const layout = renderLayoutHTML(js, css, await renderPageHTML());
        if (process.env.NODE_ENV !== 'dev')
        {
          fs.mkdirSync(path.dirname(cachedFilePath), { recursive: true });
          fs.writeFileSync(cachedFilePath, layout);
        }

        respond(res, 200, layout, 'text/html', responseHeaders);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (err: any)
      {
        if (err.code !== 'MODULE_NOT_FOUND') throw err;
        console.log('layout template not found');
      }
    }

    const page = await renderPageHTML();
    if (process.env.NODE_ENV !== 'dev')
    {
      fs.mkdirSync(path.dirname(cachedFilePath), { recursive: true });
      fs.writeFileSync(cachedFilePath, page);
    }

    respond(res, 200, page, 'text/html', responseHeaders);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any)
  {
    if (err.code !== 'MODULE_NOT_FOUND')
    {
      if (process.env.NODE_ENV === 'dev')
      {
        respond(res, 200, errorHTML, 'text/html', responseHeaders);
      }
      else
      {
        respond(res, 500);
      }

      console.log(err);
      return;
    }
  }

  respond(res, 404);
};

const invalidateModuleRecursive = (fileName: string) =>
{
  const module = require.cache[fileName];
  if (!module) return;

  for (const childModule of module.children)
  {
    invalidateModuleRecursive(childModule.id);
  }

  delete require.cache[fileName];
};
