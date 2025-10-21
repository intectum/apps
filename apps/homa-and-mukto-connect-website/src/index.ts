import { addNavigation, defineBasisAnchor, defineBasisDialog, enableLiveReload } from 'apps-web/client';

import { defineAddressDropdown } from './components/address-dropdown';
import { defineAuthenticatedPage } from './components/authenticated-page';
import { defineDropdown } from './components/dropdown';
import { defineHomeLogout } from './components/index/logout';
import { defineHomeMap } from './components/index/map';
import { defineHomeProfileForm } from './components/index/profile-form';
import { defineHomeProfileToggle } from './components/index/profile-toggle';
import { defineLoginForm } from './components/login/form';
import { defineProfilePhoto } from './components/profile-photo';
import { defineRegisterContactRow } from './components/register/contact-row';
import { defineRegisterGroupRow } from './components/register/group-row';
import { defineRegisterForm } from './components/register/form';

addNavigation();
defineBasisAnchor();
defineBasisDialog();

defineAddressDropdown();
defineAuthenticatedPage();
defineDropdown();
defineHomeLogout();
defineHomeMap();
defineHomeProfileForm();
defineHomeProfileToggle();
defineLoginForm();
defineProfilePhoto();
defineRegisterContactRow();
defineRegisterGroupRow();
defineRegisterForm();

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
