import { toElement } from 'apps-web';
import { navigate } from 'apps-web/client';
import { Address, Contact, Group, User } from 'homa-and-mukto-connect-core';

import { apiFetch, apiFetchJson } from '../../common/api';
import { geocode } from '../../google-cloud/geocoding';
import renderContactRowHTML from '../../templates/register/contact-row';
import renderGroupRowHTML from '../../templates/register/group-row';

export class ProfileForm extends HTMLFormElement
{
  async connectedCallback()
  {
    const image = this.querySelector('[data-name="image"]') as HTMLImageElement;
    const remove = this.querySelector('[data-name="remove"]') as HTMLButtonElement;

    const addContact = this.querySelector('[data-action="add-contact"]') as HTMLButtonElement;
    const addGroup = this.querySelector('[data-action="add-group"]') as HTMLButtonElement;

    remove.addEventListener('click', async () =>
    {
      const user = JSON.parse(localStorage.getItem('user') ?? '{}') as User;
      await apiFetch(`/users/${user.id}`, { method: 'DELETE' });

      navigate('/login');
    });

    addContact.addEventListener('click', async () =>
    {
      const contactAll = this.querySelectorAll('[data-name="contact"]');
      contactAll[contactAll.length - 1].insertAdjacentElement('afterend', toElement(renderContactRowHTML(undefined, contactAll.length)));
    });

    addGroup.addEventListener('click', async () =>
    {
      const groupAll = this.querySelectorAll('[data-name="group"]');
      groupAll[groupAll.length - 1].insertAdjacentElement('afterend', toElement(renderGroupRowHTML(undefined, groupAll.length)));
    });

    this.addEventListener('submit', async event =>
    {
      event.preventDefault();

      const user = JSON.parse(localStorage.getItem('user') ?? '{}') as User;
      const formData = new FormData(this);

      const address = await geocode(formData.get('address') as string) as Address;
      if (!address) throw Error('ERRRO!'); // TODO

      if (user.address) address.id = user.address.id;
      formData.set('address', JSON.stringify(address));

      formData.set('image', image.src);

      const contacts: Contact[] = [];
      for (let index = 0; formData.has(`contact-${index}-type`); index++)
      {
        contacts.push({
          type: formData.get(`contact-${index}-type`) as string,
          value: formData.get(`contact-${index}-value`) as string
        });

        formData.delete(`contact-${index}-type`);
        formData.delete(`contact-${index}-value`);
      }
      formData.set('contacts', JSON.stringify(contacts));

      const groups: Group[] = [];
      for (let index = 0; formData.has(`group-${index}-type`); index++)
      {
        groups.push({
          type: formData.get(`group-${index}-type`) as string,
          location: formData.get(`group-${index}-location`) as string,
          month: Number(formData.get(`group-${index}-month`)),
          year: Number(formData.get(`group-${index}-year`))
        });

        formData.delete(`group-${index}-type`);
        formData.delete(`group-${index}-location`);
        formData.delete(`group-${index}-month`);
        formData.delete(`group-${index}-year`);
      }
      formData.set('groups', JSON.stringify(groups));

      const updatedUser = await apiFetchJson<User>(`/users/${user.id}`, {
        method: 'PUT',
        body: formData
      });

      localStorage.setItem('user', JSON.stringify(updatedUser));
    });
  }
}

export const defineHomeProfileForm = () =>
  customElements.define('hm-home-profile-form', ProfileForm, { extends: 'form' });
