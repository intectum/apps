import fs from 'fs';

import renderLayoutHTML from './src/templates/layout';
import renderPageHTML from './src/templates/page';

export const buildPages = async () =>
{
  const homePageHTML = await renderPageHTML('/');
  fs.writeFileSync('dist/index.html', renderLayoutHTML(homePageHTML));
  fs.writeFileSync('dist/index.page.html', homePageHTML);
  console.log('  rendered  dist/index.html');
};
