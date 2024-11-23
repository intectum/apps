import fs from 'fs';

import renderLayoutHTML from './src/templates/layout';

export const buildPages = () =>
{
  fs.writeFileSync('dist/index.html', renderLayoutHTML());
  console.log('  rendered  dist/index.html');
};
