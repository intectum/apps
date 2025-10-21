import { build } from 'apps-web/tools';

import renderLayoutHTML from './src/layout';
import { default as renderIndexPageHTML } from './src/pages/index';
import { default as renderLoginPageHTML } from './src/pages/login';
import { default as renderRegisterPageHTML } from './src/pages/register';

(async function()
{
  console.log('staring build...');
  const startTime = performance.now();

  await build(
    renderLayoutHTML,
    {
      'index': renderIndexPageHTML,
      'login': renderLoginPageHTML,
      'register': renderRegisterPageHTML
    }
  );

  console.log(`build completed in ${Math.round(performance.now() - startTime)}ms`);
})();
