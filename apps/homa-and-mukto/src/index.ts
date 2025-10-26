import dotenv from 'dotenv';
dotenv.config();

import { appRequestListener, createServer } from 'apps-web/tools';

import { apiRequestListener } from './api';

createServer(async (req, res, secure) =>
{
  if (req.url?.startsWith('/api/'))
  {
    await apiRequestListener(req, res, secure);
  }
  else
  {
    await appRequestListener(req, res, secure);
  }
});
