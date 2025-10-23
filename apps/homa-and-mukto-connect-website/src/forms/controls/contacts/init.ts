import { toElement } from 'apps-web';
import { init } from 'apps-web/client';
import { Contact } from 'homa-and-mukto-connect-core';

import { instagramRegex, phoneRegex } from '../../../common/data';
import strings from '../../../common/strings';
import renderContactRowHTML from './row';

init['[data-init="contacts-control"]'] = async element =>
{
  const add = element.querySelector('[data-name="add-contact"]') as HTMLButtonElement;

  add.addEventListener('click', async () =>
  {
    const contactAll = element.querySelectorAll('[data-name="contact"]');
    contactAll[contactAll.length - 1].insertAdjacentElement('afterend', toElement(renderContactRowHTML(undefined, contactAll.length)));
  });
};

init['[data-init="contacts-control-row"]'] = async element =>
{
  const type = element.querySelector('[name$="-type"]') as HTMLInputElement;
  const value = element.querySelector('[name$="-value"]') as HTMLInputElement;

  const applyPattern = () =>
  {
    if (type.value === 'instagram')
    {
      value.title = strings.forms.instagramTitle;
      value.pattern = instagramRegex;
    }
    else if (type.value === 'phone' || type.value === 'whatsapp')
    {
      value.title = strings.forms.phoneTitle;
      value.pattern = phoneRegex;
    }
  };

  type.addEventListener('change', () => applyPattern());

  applyPattern();
};

export const resolveContactsFormData = (formData: FormData) =>
{
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
};
