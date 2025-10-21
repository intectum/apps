import { build } from 'apps-web/tools';

import { default as renderIndexPageHTML } from './src/templates/index/page';
import { default as renderLoginPageHTML } from './src/templates/login/page';
import renderLayoutHTML from './src/templates/layout';

(async function()
{
  console.log('staring build...');
  const startTime = performance.now();

  await build(
    renderLayoutHTML,
    {
      'index': renderIndexPageHTML,
      'login': renderLoginPageHTML
    }
  );

  console.log(`build completed in ${Math.round(performance.now() - startTime)}ms`);
})();
