import {
  addDialogs,
  addNavigation,
  applyInit,
  enableLiveReload,
  init,
  navigate
} from 'based/client';

import { getToken } from './util/data';

addDialogs();
addNavigation();

init['[data-require-auth=""]'] = async () =>
{
  if (!localStorage.getItem('token')) await navigate('/login');
};

init['[data-init="user-image"]'] = element =>
{
  const token = getToken();
  (element as HTMLImageElement).src = token?.user.pending?.image ?? token?.user.image ?? '';
};

import './pages/admin.page.client';
import './pages/index.page.client';
import './pages/index.page.users-dialog.client';
import './pages/login.page.client';
import './pages/login/password/forgot.page.client';
import './pages/login/password/reset.page.client';
import './pages/register.page.client';
import './pages/register/verify.page.client';

import './components/address-dropdown.control.client';
import './components/contacts.control.client';
import './components/dropdown.control.client';
import './components/groups.control.client';
import './components/header.client';
import './components/image.control.client';

applyInit(document.body);

if (process.env.NODE_ENV === 'development')
{
  enableLiveReload();
}
