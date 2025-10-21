import { navigate } from 'apps-web/client';

export class Logout extends HTMLButtonElement
{
  async connectedCallback()
  {
    this.addEventListener('click', () =>
    {
      localStorage.removeItem('user');
      navigate('/login');
    });
  }
}

export const defineHomeLogout = () =>
  customElements.define('hm-home-logout', Logout, { extends: 'button' });
