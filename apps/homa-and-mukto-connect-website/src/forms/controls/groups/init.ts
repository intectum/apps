import { toElement } from 'apps-web';
import { init } from 'apps-web/client';
import { Group } from 'homa-and-mukto-connect-core';

import renderGroupRowHTML from './row';

init['[data-init="groups-control"]'] = async element =>
{
  const add = element.querySelector('[data-name="add-group"]') as HTMLButtonElement;

  add.addEventListener('click', async () =>
  {
    const groupAll = element.querySelectorAll('[data-name="group"]');
    groupAll[groupAll.length - 1].insertAdjacentElement('afterend', toElement(renderGroupRowHTML(undefined, groupAll.length)));
  });
};

export const resolveGroupsFormData = (formData: FormData) =>
{
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
};
