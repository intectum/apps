import * as dotenv from 'dotenv';
dotenv.config();

import { appRequestListener, createServer, staticRequestListener } from 'apps-web/tools';

import { apiRequestListener } from './api';

const pageModules = {
  '/admin': 'src/app/pages/admin.page.template',
  '/index': 'src/app/pages/index.page.template',
  '/login': 'src/app/pages/login.page.template',
  '/login/password/email': 'src/app/pages/login/password/email.page.template',
  '/login/password/forgot': 'src/app/pages/login/password/forgot.page.template',
  '/login/password/reset': 'src/app/pages/login/password/reset.page.template',
  '/register': 'src/app/pages/register.page.template',
  '/register/email': 'src/app/pages/register/email.page.template',
  '/register/review': 'src/app/pages/register/review.page.template',
  '/register/verify': 'src/app/pages/register/verify.page.template'
};

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

  if (await appRequestListener(req, res, 'src/app/layout.template', pageModules))
  {
    return true;
  }

  return staticRequestListener(req, res);
});
