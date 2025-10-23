import { init, navigate } from 'apps-web/client';
import { Token } from 'homa-and-mukto-core';

import { apiFetch } from '../../common/api';
import { openErrorDialog } from '../../components/error-dialog';

init['[data-init="login-form"]'] = async element =>
{
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const formData = new FormData(element as HTMLFormElement);

    const response = await apiFetch('/oauth/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'password',
        client_id: 'homa-and-mukto-app',
        client_secret: 'secret', // TODO
        username: formData.get('username') as string,
        password: formData.get('password') as string
      })
    });

    if (!response.ok)
    {
      openErrorDialog(response.statusText);
      return;
    }

    const token = await response.json() as Token;
    localStorage.setItem('token', JSON.stringify(token));
    await navigate('/');
  });
};
