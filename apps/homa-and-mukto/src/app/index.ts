import {
  addNavigation,
  applyInit,
  defineBasisAnchor,
  defineBasisDialog,
  enableLiveReload,
  init,
  navigate
} from 'apps-web/client';

addNavigation();
defineBasisAnchor();
defineBasisDialog();

init['[data-require-auth=""]'] = async () =>
{
  if (!localStorage.getItem('token')) await navigate('/login');
};

import './pages/admin/init';
import './pages/index/init';
import './pages/register/verify/init';

import './forms/login/init';
import './forms/password-forgot/init';
import './forms/password-reset/init';
import './forms/profile/init';
import './forms/register/init';

import './forms/controls/address-dropdown/init';
import './forms/controls/contacts/init';
import './forms/controls/dropdown/init';
import './forms/controls/groups/init';
import './forms/controls/image/init';

applyInit(document.body);

if (process.env.ENVIRONMENT === 'dev')
{
  enableLiveReload();
}
