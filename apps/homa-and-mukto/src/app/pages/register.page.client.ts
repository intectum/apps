import { init, navigate } from 'apps-web/client';

import { initProfileForm } from '../components/profile-form.client';

init['[data-init="profile-form-register"]'] = async element =>
{
  await initProfileForm(element as HTMLFormElement, undefined, async () => await navigate('/register/email'));
};
