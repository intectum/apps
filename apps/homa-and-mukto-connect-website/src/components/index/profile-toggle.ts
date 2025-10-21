import { toElement } from 'apps-web';
import { User } from 'homa-and-mukto-connect-core';

import renderProfileDialogHTML from '../../templates/index/profile-dialog';

export class ProfileToggle extends HTMLButtonElement
{
  async connectedCallback()
  {
    this.addEventListener('click', () =>
    {
      const user = JSON.parse(localStorage.getItem('user') ?? '{}') as User;

      const dialog = toElement<HTMLDialogElement>(renderProfileDialogHTML(user));
      document.body.appendChild(dialog);

      dialog.onclose = () => dialog.remove();
      dialog.showModal();
    });
  }
}

export const defineHomeProfileToggle = () =>
  customElements.define('hm-home-profile-toggle', ProfileToggle, { extends: 'button' });
