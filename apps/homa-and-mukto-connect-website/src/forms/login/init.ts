import { init, navigate } from 'apps-web/client';
import { User } from 'homa-and-mukto-connect-core';

import { apiFetchJson } from '../../common/api';

init['[data-init="login-form"]'] = async element =>
{
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const formData = new FormData(element as HTMLFormElement);

    const token = await apiFetchJson<User>('/oauth/token', {
      method: 'POST',
      body: new URLSearchParams({
        'username': formData.get('username') as string,
        'password': formData.get('password') as string,
        'grant_type': 'password',
        'client_id': 'homa-and-mukto-connect',
        'client_secret': 'secret' // TODO
      })
    });

    localStorage.setItem('token', JSON.stringify(token));
    await navigate('/');
  });
};
