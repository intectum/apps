import { toElement } from 'apps-web';
import { init } from 'apps-web/client';
import { Contact } from 'homa-and-mukto-core';

import { instagramRegex, phoneRegex } from '../../../common/data';
import strings from '../../../common/strings';
import renderContactRowHTML from './row';

init['[data-init="contacts-control"]'] = async element =>
{
  const add = element.querySelector('[data-name="contacts-control-add"]') as HTMLButtonElement;

  const contactAll = element.querySelectorAll('[data-name="contact"]');
  element.setAttribute('data-next-row-id', contactAll.length.toString());

  if (contactAll.length === 1) contactAll[0].querySelector('[data-name="contacts-control-row-remove"]')?.setAttribute('disabled', '');

  add.addEventListener('click', async () =>
  {
    const nextRowId = Number(element.getAttribute('data-next-row-id') ?? 0);
    const contactAll = element.querySelectorAll('[data-name="contact"]');
    contactAll[contactAll.length - 1].insertAdjacentElement('afterend', toElement(renderContactRowHTML(undefined, nextRowId)));
    element.setAttribute('data-next-row-id', (nextRowId + 1).toString());

    for (const contact of contactAll) contact.querySelector('[data-name="contacts-control-row-remove"]')?.removeAttribute('disabled');
  });
};

init['[data-init="contacts-control-row"]'] = async element =>
{
  const type = element.querySelector('[name$="-type"]') as HTMLInputElement;
  const value = element.querySelector('[name$="-value"]') as HTMLInputElement;
  const remove = element.querySelector('[data-name="contacts-control-row-remove"]') as HTMLButtonElement;

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
    else
    {
      value.title = '';
      value.pattern = '';
    }
  };

  type.addEventListener('change', () => applyPattern());
  remove.addEventListener('click', () =>
  {
    element.remove();

    const contactAll = element.closest('[data-init="contacts-control"]')?.querySelectorAll('[data-name="contact"]') ?? [];
    if (contactAll.length === 1) contactAll[0].querySelector('[data-name="contacts-control-row-remove"]')?.setAttribute('disabled', '');
  });

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
