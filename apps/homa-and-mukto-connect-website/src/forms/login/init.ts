import { init, navigate } from 'apps-web/client';
import { User } from 'homa-and-mukto-connect-core';

import { apiFetchJson } from '../../common/api';

init['[data-init="login-form"]'] = async element =>
{
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const email = element.querySelector('[name="email"]') as HTMLInputElement;
    const password = element.querySelector('[name="password"]') as HTMLInputElement;

    const user = await apiFetchJson<User>('/users/authenticate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    localStorage.setItem('user', JSON.stringify(user));
    await navigate('/');
  });
};
