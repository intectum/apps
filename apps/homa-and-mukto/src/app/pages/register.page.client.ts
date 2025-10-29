import { init, navigate } from 'apps-web/client';

import { FullUser } from '../../types';
import { openErrorDialog } from '../components/error-dialog.template';
import { initProfileForm } from '../components/profile-form.client';
import { apiFetch } from '../util/api';
import renderProfileFormHTML from '../components/profile-form.template';
import { toElement } from 'apps-web';

init['[data-init="register"]'] = async element =>
{
  let user: FullUser | undefined = undefined;

  const searchParams = new URLSearchParams(location.search);
  if (searchParams.has('id') && searchParams.has('key'))
  {
    const userId = searchParams.get('id');

    const response = await apiFetch(`/users/${userId}`);
    if (!response.ok)
    {
      openErrorDialog(response.statusText);
      return;
    }

    user = await response.json() as FullUser;
  }

  const form = toElement<HTMLFormElement>(renderProfileFormHTML('register', user));
  element.append(form);

  await initProfileForm(form, user, async () =>
  {
    if (!user) await navigate('/register/email');
  });
};
