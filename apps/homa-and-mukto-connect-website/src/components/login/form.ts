import { navigate } from 'apps-web/client';
import { User } from 'homa-and-mukto-connect-core';

import { apiFetchJson } from '../../common/api';

export class Form extends HTMLFormElement
{
  async connectedCallback()
  {
    const register = this.querySelector('[data-action="register"]');
    register?.addEventListener('click', async () => await navigate('/register'));

    this.addEventListener('submit', async event =>
    {
      event.preventDefault();

      const email = this.querySelector('[name="email"]') as HTMLInputElement;
      const password = this.querySelector('[name="password"]') as HTMLInputElement;

      const user = await apiFetchJson<User>('/users/authenticate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value })
      });

      localStorage.setItem('user', JSON.stringify(user));
      await navigate('/');
    });
  }
}

export const defineLoginForm = () =>
  customElements.define('hm-login-form', Form, { extends: 'form' });
