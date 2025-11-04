import { toElement } from 'apps-web';
import { applyInit, init } from 'apps-web/client';

import { FullUser } from '../../types';
import { openErrorDialog } from '../components/error-dialog.template';
import { getToken } from '../util/data';
import { apiFetch } from '../util/api';
import renderAdminRowHTML from './admin.page.row.template';

let users: FullUser[] = [];
let reviewRequired = false;

init['[data-init="admin"]'] = async element =>
{
  const response = await apiFetch('/users');
  if (!response.ok)
  {
    openErrorDialog(response.statusText);
    return;
  }

  users = await response.json() as FullUser[];

  const review = element.querySelector('[name="review"]') as HTMLInputElement;
  review.addEventListener('change', event =>
  {
    reviewRequired = (event.target as HTMLInputElement).checked;
    update(element);
  });

  update(element);
};

const update = (element: HTMLElement) =>
{
  const tbody = element.querySelector('tbody') as HTMLTableSectionElement;
  tbody.innerHTML = '';

  const displayUsers = users.filter(user => !reviewRequired || (user.status === 'review' && user.pending));
  for (const user of displayUsers)
  {
    const row = toElement(renderAdminRowHTML(user), 'tbody');
    tbody.appendChild(row);

    const accept = row.querySelector('[data-name="accept"]') as HTMLButtonElement | undefined;
    const deny = row.querySelector('[data-name="deny"]') as HTMLButtonElement | undefined;

    if (!accept || !deny) return;

    accept.addEventListener('click', async () =>
    {
      accept.disabled = true;
      deny.disabled = true;

      try
      {
        const id = row.getAttribute('data-id');
        const acceptResponse = await apiFetch(`/users/${id}/accept`, { method: 'POST' });
        if (!acceptResponse.ok)
        {
          openErrorDialog(acceptResponse.statusText);
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
        accept.disabled = false;
        deny.disabled = false;
      }
    });

    deny.addEventListener('click', async () =>
    {
      accept.disabled = true;
      deny.disabled = true;

      try
      {
        const id = row.getAttribute('data-id');
        const denyResponse = await apiFetch(`/users/${id}/deny`, { method: 'POST' });
        if (!denyResponse.ok)
        {
          openErrorDialog(denyResponse.statusText);
          return;
        }
      }
      finally
      {
        accept.disabled = false;
        deny.disabled = false;
      }
    });
  }
};
