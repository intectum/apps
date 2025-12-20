import { appRequestListener, createServer, staticRequestListener } from 'based/server';
import { env } from 'based/tools';

import { layoutModule, pageModules } from './modules';

env(true);

createServer(async (req, res) =>
{
  if (await appRequestListener(req, res, layoutModule, pageModules))
  {
    return true;
  }

  return staticRequestListener(req, res);
});
