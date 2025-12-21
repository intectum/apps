import { appRequestListener, createServer, staticRequestListener } from 'based/server';
import { env } from 'based/tools';

import { apiRequestListener } from './api';
import { layoutModule, pageModules } from './modules';

env(true);

createServer(async (req, res, secure) =>
{
  if (req.url?.startsWith('/api/'))
  {
    return apiRequestListener(req, res, secure);
  }

  if (req.url?.startsWith('/user-images/'))
  {
    return staticRequestListener(req, res, '.');
  }

  if (await appRequestListener(req, res, layoutModule, pageModules, [ 'src/app/index.ts', 'src/app/index.css' ]))
  {
    return true;
  }

  return staticRequestListener(req, res);
});
