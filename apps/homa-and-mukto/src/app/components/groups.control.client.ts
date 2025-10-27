import { toElement } from 'apps-web';
import { init } from 'apps-web/client';

import { Group } from '../../types';
import renderGroupRowHTML from './groups.control.row.template';

init['[data-init="groups-control"]'] = async element =>
{
  const add = element.querySelector('[data-name="groups-control-add"]') as HTMLButtonElement;

  const groupAll = element.querySelectorAll('[data-name="group"]');
  element.setAttribute('data-next-row-id', groupAll.length.toString());

  if (groupAll.length === 1) groupAll[0].querySelector('[data-name="groups-control-row-remove"]')?.setAttribute('disabled', '');

  add.addEventListener('click', async () =>
  {
    const nextRowId = Number(element.getAttribute('data-next-row-id') ?? 0);
    const groupAll = element.querySelectorAll('[data-name="group"]');
    groupAll[groupAll.length - 1].insertAdjacentElement('afterend', toElement(renderGroupRowHTML(undefined, nextRowId)));
    element.setAttribute('data-next-row-id', (nextRowId + 1).toString());

    for (const group of groupAll) group.querySelector('[data-name="groups-control-row-remove"]')?.removeAttribute('disabled');
  });
};

init['[data-init="groups-control-row"]'] = async element =>
{
  const remove = element.querySelector('[data-name="groups-control-row-remove"]') as HTMLButtonElement;

  remove.addEventListener('click', () =>
  {
    element.remove();

    const groupAll = element.closest('[data-init="groups-control"]')?.querySelectorAll('[data-name="group"]') ?? [];
    if (groupAll.length === 1) groupAll[0].querySelector('[data-name="groups-control-row-remove"]')?.setAttribute('disabled', '');
  });
};

export const resolveGroupsFormData = (formData: FormData) =>
{
  const rowIds = Array.from(formData.keys())
    .map(key => key.match(/^group-(\d+)-type$/)?.[1])
    .filter(rowId => !!rowId)
    .map(rowId => Number(rowId));

  const groups: Group[] = [];
  for (const rowId of rowIds)
  {
    groups.push({
      type: formData.get(`group-${rowId}-type`) as string,
      location: formData.get(`group-${rowId}-location`) as string,
      month: Number(formData.get(`group-${rowId}-month`)),
      year: Number(formData.get(`group-${rowId}-year`))
    });

    formData.delete(`group-${rowId}-type`);
    formData.delete(`group-${rowId}-location`);
    formData.delete(`group-${rowId}-month`);
    formData.delete(`group-${rowId}-year`);
  }
  formData.set('groups', JSON.stringify(groups));
};
