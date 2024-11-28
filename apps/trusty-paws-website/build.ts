import { build } from 'apps-web/tools';

import renderLayoutHTML from './src/templates/layout';
import renderIndexPageHTML from './src/templates/index/page';

(async function()
{
  console.log('staring build...');
  const startTime = performance.now();

  await build(renderLayoutHTML, { 'index': renderIndexPageHTML });

  console.log(`build completed in ${Math.round(performance.now() - startTime)}ms`);
})();
