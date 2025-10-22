import {
  addNavigation,
  apply,
  defineBasisAnchor,
  defineBasisDialog,
  enableLiveReload,
  init,
  navigate
} from 'apps-web/client';

addNavigation();
defineBasisAnchor();
defineBasisDialog();

init['[data-init="require-auth"]'] = async () =>
{
  if (!localStorage.getItem('token')) await navigate('/login');
};

init['[data-init="remove"]'] = element =>
{
  const removable = element.closest('[data-init="removable"]');
  if (removable) element.addEventListener('click', () => removable.remove());
};

import './pages/index/init';
import './pages/register/verify/init';

import './forms/login/init';
import './forms/profile/init';
import './forms/register/init';

import './forms/controls/address-dropdown/init';
import './forms/controls/contacts/init';
import './forms/controls/dropdown/init';
import './forms/controls/groups/init';
import './forms/controls/image/init';

apply(document.body);

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
