import { toElement } from 'apps-web';
import { init } from 'apps-web/client';

import { Contact } from '../../types';
import { instagramRegex, phoneRegex } from '../util/data';
import strings from '../util/strings';
import renderContactRowHTML from './contacts.control.row.template';

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
      value.removeAttribute('title');
      value.removeAttribute('pattern');
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
  const rowIds = Array.from(formData.keys())
    .map(key => key.match(/^contact-(\d+)-type$/)?.[1])
    .filter(rowId => !!rowId)
    .map(rowId => Number(rowId));

  const contacts: Contact[] = [];
  for (const rowId of rowIds)
  {
    contacts.push({
      type: formData.get(`contact-${rowId}-type`) as string,
      value: formData.get(`contact-${rowId}-value`) as string
    });

    formData.delete(`contact-${rowId}-type`);
    formData.delete(`contact-${rowId}-value`);
  }
  formData.set('contacts', JSON.stringify(contacts));
};
