import { clean, runDevServer, copyStaticFiles } from 'apps-web/build';

import { buildPages } from './pages';

(async function()
{
  console.log('starting dev...');
  clean();
  copyStaticFiles();
  buildPages();
  await runDevServer();
})();
