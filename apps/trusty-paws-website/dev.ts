import { clean, runDevServer, copyStaticFiles } from 'apps-web/build';

import { buildPages } from './pages';

(async function()
{
  console.log('starting dev...');
  clean();
  copyStaticFiles();
  await buildPages();
  await runDevServer();
})();
