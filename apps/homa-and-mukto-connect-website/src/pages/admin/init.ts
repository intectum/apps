import { toElement } from 'apps-web';
import { init } from 'apps-web/client';
import { FullUser } from 'homa-and-mukto-connect-core';

import { getToken } from '../../common/data';
import { apiFetch } from '../../common/api';
import { openErrorDialog } from '../../components/error-dialog';
import renderAdminRowHTML from './row';

init['[data-init="admin"]'] = async element =>
{
  const tbody = element.querySelector('tbody') as HTMLTableSectionElement;

  const token = getToken();
  if (!token) return;

  const response = await apiFetch('/users/review');
  if (!response.ok)
  {
    openErrorDialog(response.statusText);
    return;
  }

  const users = await response.json() as FullUser[];

  for (const user of users)
  {
    const row = toElement(renderAdminRowHTML(user), 'tbody');

    const activate = row.querySelector('[data-name="activate"]') as HTMLButtonElement;
    activate.addEventListener('click', async () =>
    {
      const response = await apiFetch(`/users/${row.getAttribute('data-id')}/activate`, { method: 'POST' });
      if (!response.ok)
      {
        openErrorDialog(response.statusText);
        return;
      }

      row.remove();
    });

    tbody.appendChild(row);
  }
};
