import fs from 'fs';
import { dirname } from 'path';

import * as dotenv from 'dotenv';

import { LayoutHTMLRenderer } from '../common/types';
import { bundle } from './bundle';

export const build = async (renderLayoutHTML: LayoutHTMLRenderer, renderPagesHTML: Record<string, () => string | Promise<string>>) =>
{
  dotenv.config();
  process.env.NODE_ENV = 'production';

  fs.rmSync('dist', { recursive: true, force: true });
  fs.mkdirSync('dist');
  console.log('  cleaned   dist');

  if (fs.existsSync('dist'))
  {
    fs.cpSync('static', 'dist', { recursive: true });
    console.log('  copied    dist/*static files*');
  }

  const { js, css } = await bundle();

  for (const [ path, renderPageHTML ] of Object.entries(renderPagesHTML))
  {
    const pageHTML = await renderPageHTML();

    fs.mkdirSync(`dist/${dirname(path)}`, { recursive: true });

    fs.writeFileSync(`dist/${path}.html`, renderLayoutHTML(js, css, pageHTML));
    console.log(`  rendered  dist/${path}.html`);

    fs.writeFileSync(`dist/${path}.page.html`, pageHTML);
    console.log(`  rendered  dist/${path}.page.html`);
  }
};
