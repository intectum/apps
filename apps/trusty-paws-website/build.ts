import { bundle, clean, copyStaticFiles } from 'apps-web/build';

import { buildPages } from './pages';

(async function()
{
  console.log('staring build...');
  process.env.NODE_ENV = 'production';
  const startTime = performance.now();

  clean();
  copyStaticFiles();
  await buildPages();
  await bundle();

  console.log(`build completed in ${Math.round(performance.now() - startTime)}ms`);
})();
