import { build, env } from 'based/tools';

import { layoutModule, pageModules } from './modules';

(async function()
{
  env(false);

  console.log('staring build...');
  const startTime = performance.now();

  await build(layoutModule, pageModules);

  console.log(`build completed in ${Math.round(performance.now() - startTime)}ms`);
})();
