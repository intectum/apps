import { init, navigate } from 'apps-web/client';

import { apiFetch } from '../../common/api';

init['[data-init="password-forgot-form"]'] = async element =>
{
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const formData = new FormData(element as HTMLFormElement);

    await apiFetch('/password-reset', {
      method: 'POST',
      body: formData
    });

    await navigate('/login/password/email');
  });
};
