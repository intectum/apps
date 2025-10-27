import { toElement } from 'apps-web';
import { init, navigate } from 'apps-web/client';

import { getToken } from '../util/data';
import { apiFetch } from '../util/api';
import { openErrorDialog } from './error-dialog.template';
import { geocode } from '../util/geocoding';
import { Address, FullUser } from '../../types';
import { resolveContactsFormData } from './contacts.control.client';
import { resolveGroupsFormData } from './groups.control.client';
import {
  renderDeleteProfileDialogHTML,
  renderProfileDialogHTML,
  renderReviewProfileDialogHTML
} from './header.template';

init['[data-init="user-image"]'] = element =>
{
  const token = getToken();
  (element as HTMLImageElement).src = token?.user.pending?.image ?? token?.user.image ?? '';
};

init['[data-init="profile-toggle"]'] = element =>
{
  element.addEventListener('click', () =>
  {
    const token = getToken();
    if (!token) return;

    const dialog = toElement<HTMLDialogElement>(renderProfileDialogHTML(token.user));
    document.body.appendChild(dialog);

    dialog.onclose = () => dialog.remove();
    dialog.showModal();
  });
};

init['[data-init="admin"]'] = element =>
{
  const token = getToken();
  if (!token) return;

  if (token.user.admin) element.style.display = '';
};

init['[data-init="logout"]'] = element =>
{
  element.addEventListener('click', async () =>
  {
    localStorage.removeItem('token');
    await navigate('/login');
  });
};

init['[data-init="profile-form"]'] = async element =>
{
  const remove = element.querySelector('[data-name="profile-form-remove"]') as HTMLButtonElement;

  remove.addEventListener('click', () =>
  {
    const token = getToken();
    if (!token) return;

    const dialog = toElement<HTMLDialogElement>(renderDeleteProfileDialogHTML());
    document.body.appendChild(dialog);

    dialog.onclose = () => dialog.remove();
    dialog.showModal();

    const confirm = dialog.querySelector('[data-name="delete-profile"]') as HTMLButtonElement;
    confirm.addEventListener('click', async () =>
    {
      confirm.disabled = true;

      try
      {
        const response = await apiFetch(`/users/${getToken()?.user.id}`, { method: 'DELETE' });
        if (!response.ok)
        {
          openErrorDialog(response.statusText);
          return;
        }

        await navigate('/login');
      }
      finally
      {
        confirm.disabled = false;
      }
    });

    const cancel = dialog.querySelector('[data-name="delete-profile-cancel"]') as HTMLButtonElement;
    cancel.addEventListener('click', () => dialog.remove());
  });

  const submitButton = element.querySelector('[data-name="profile-form-submit"]') as HTMLButtonElement;

  element.addEventListener('submit', async event =>
  {
    event.preventDefault();
    submitButton.disabled = true;

    try
    {
      const token = getToken();
      if (!token) return;

      const formData = new FormData(element as HTMLFormElement);

      const address = await geocode(formData.get('address') as string) as Address;
      if (!address) throw Error('ERRRO!'); // TODO

      if (token.user.address) address.id = token.user.address.id;
      formData.set('address', JSON.stringify(address));

      const image = element.querySelector('[data-name="image"]') as HTMLImageElement;
      formData.set('image', image.src);

      resolveContactsFormData(formData);
      resolveGroupsFormData(formData);

      const response = await apiFetch(`/users/${token.user.id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok)
      {
        openErrorDialog(response.statusText);
        return;
      }

      token.user = await response.json() as FullUser;
      localStorage.setItem('token', JSON.stringify(token));

      const userImageAll = document.querySelectorAll('[data-init="user-image"]');
      for (const userImage of userImageAll)
      {
        init['[data-init="user-image"]'](userImage as HTMLElement);
      }

      if (token.user.pending)
      {
        const dialog = toElement<HTMLDialogElement>(renderReviewProfileDialogHTML());
        document.body.appendChild(dialog);

        dialog.onclose = () => dialog.remove();
        dialog.showModal();
      }
    }
    finally
    {
      submitButton.disabled = false;
    }
  });
};
