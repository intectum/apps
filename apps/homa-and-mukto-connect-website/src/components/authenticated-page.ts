import { navigate } from 'apps-web/client';

export class AuthenticatedPage extends HTMLDivElement
{
  async connectedCallback()
  {
    if (!localStorage.getItem('user'))
    {
      await navigate('/login');
    }
  }
}

export const defineAuthenticatedPage = () =>
  customElements.define('hm-authenticated-page', AuthenticatedPage, { extends: 'div' });
