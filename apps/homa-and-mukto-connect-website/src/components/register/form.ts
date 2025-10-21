import { toElement } from 'apps-web';
import { navigate } from 'apps-web/client';

import { Contact, Group } from 'homa-and-mukto-connect-core';

import { apiFetch } from '../../common/api';
import { geocode } from '../../google-cloud/geocoding';
import renderContactRowHTML from '../../templates/register/contact-row';
import renderGroupRowHTML from '../../templates/register/group-row';

export class Form extends HTMLFormElement
{
  async connectedCallback()
  {
    const imageInput = this.querySelector('[name="image"]') as HTMLInputElement;
    const imageOpen = this.querySelector('[data-action="image-open"]') as HTMLButtonElement;
    const image = this.querySelector('[data-name="image"]') as HTMLImageElement;

    const addContact = this.querySelector('[data-action="add-contact"]') as HTMLButtonElement;
    const addGroup = this.querySelector('[data-action="add-group"]') as HTMLButtonElement;

    imageInput.addEventListener('change', async event =>
    {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const base64 = btoa(String.fromCharCode(...(await file.bytes())));
      image.src = `data:${file.type};base64,${base64}`;
      image.style.display = 'block';
      imageOpen.children[1]?.remove();
    });
    imageOpen.addEventListener('click', () => imageInput.click());

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

      const formData = new FormData(this);

      const address = await geocode(formData.get('address') as string);
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

      const response = await apiFetch('/registrations', {
        method: 'POST',
        body: formData
      });

      if (response.ok) await navigate('/login');
    });
  }
}

export const defineRegisterForm = () =>
  customElements.define('hm-register-form', Form, { extends: 'form' });
