import { User } from 'homa-and-mukto-connect-core';

export class ProfilePhoto extends HTMLImageElement
{
  async connectedCallback()
  {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}') as User;
    this.src = user.image;
  }
}

export const defineProfilePhoto = () =>
  customElements.define('hm-profile-photo', ProfilePhoto, { extends: 'img' });
