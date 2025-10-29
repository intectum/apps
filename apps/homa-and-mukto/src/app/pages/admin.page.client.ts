import { toElement } from 'apps-web';
import { applyInit, init } from 'apps-web/client';

import { FullUser } from '../../types';
import { openErrorDialog } from '../components/error-dialog.template';
import { getToken } from '../util/data';
import { apiFetch } from '../util/api';
import renderAdminRowHTML from './admin.page.row.template';

init['[data-init="admin"]'] = async element =>
{
  const tbody = element.querySelector('tbody') as HTMLTableSectionElement;

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
      activate.disabled = true;

      try
      {
        const id = row.getAttribute('data-id');
        const activateResponse = await apiFetch(`/users/${id}/activate`, { method: 'POST' });
        if (!activateResponse.ok)
        {
          openErrorDialog(activateResponse.statusText);
          return;
        }

        row.remove();

        if (id === getToken()?.user.id)
        {
          const userResponse = await apiFetch(`/users/${id}`);
          if (!userResponse.ok)
          {
            openErrorDialog(userResponse.statusText);
            return;
          }

          const token = getToken();
          if (token)
          {
            token.user = await userResponse.json() as FullUser;
            localStorage.setItem('token', JSON.stringify(token));

            applyInit(document.body, [ '[data-init="user-image"]' ]);
          }
        }
      }
      finally
      {
        activate.disabled = false;
      }
    });

    tbody.appendChild(row);
  }
};
