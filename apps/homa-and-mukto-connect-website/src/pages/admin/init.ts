import { toElement } from 'apps-web';
import { init } from 'apps-web/client';
import { FullUser } from 'homa-and-mukto-connect-core';

import { getToken } from '../../common/data';
import { apiFetch, apiFetchJson } from '../../common/api';
import renderAdminRowHTML from './row';

init['[data-init="admin"]'] = async element =>
{
  const tbody = element.querySelector('tbody') as HTMLTableSectionElement;

  const token = getToken();
  if (!token) return;

  const users = await apiFetchJson<FullUser[]>('/users/review');
  for (const user of users)
  {
    const row = toElement(renderAdminRowHTML(user), 'tbody');

    const activate = row.querySelector('[data-name="activate"]') as HTMLButtonElement;
    activate.addEventListener('click', async () =>
    {
      await apiFetch(`/users/${row.getAttribute('data-id')}/activate`, { method: 'POST' });

      row.remove();
    });

    tbody.appendChild(row);
  }
};
