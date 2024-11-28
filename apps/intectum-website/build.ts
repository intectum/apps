import { build } from 'apps-web/tools';

import { default as renderIndexPageHTML } from './src/templates/index/page';
import renderLayoutHTML from './src/templates/layout';
import { default as renderProjectsPageHTML } from './src/templates/projects/page';

(async function()
{
  console.log('staring build...');
  const startTime = performance.now();

  await build(
    renderLayoutHTML,
    {
      'index': renderIndexPageHTML,
      'projects': renderProjectsPageHTML
    }
  );

  console.log(`build completed in ${Math.round(performance.now() - startTime)}ms`);
})();
