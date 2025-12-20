import fs from 'node:fs';
import { dirname } from 'node:path';

import { bundle } from './bundle';

export const build = async (layoutModule: string, pageModules: Record<string, string>) =>
{
  fs.rmSync('dist', { recursive: true, force: true });
  fs.mkdirSync('dist');
  console.log('  cleaned   dist');

  if (fs.existsSync('static'))
  {
    fs.cpSync('static', 'dist', { recursive: true });
    console.log('  copied    dist/*static files*');
  }

  const { default: renderLayoutHTML } = await import(`${process.cwd()}/${layoutModule}`);

  const { js, css } = await bundle();

  for (const [ path, pageModule ] of Object.entries(pageModules))
  {
    const { default: renderPageHTML } = await import(`${process.cwd()}/${pageModule}`);
    const pageHTML = await renderPageHTML(path);

    fs.mkdirSync(`dist${dirname(path)}`, { recursive: true });

    fs.writeFileSync(`dist${path}.html`, renderLayoutHTML(js, css, pageHTML));
    console.log(`  rendered  dist${path}.html`);

    fs.writeFileSync(`dist${path}.page.html`, pageHTML);
    console.log(`  rendered  dist${path}.page.html`);
  }
};
