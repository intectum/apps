import { toElement } from 'apps-web';
import { init, navigate } from 'apps-web/client';
import { Address, FullUser } from 'homa-and-mukto-core';

import { apiFetch } from '../../common/api';
import { getToken } from '../../common/data';
import { geocode } from '../../common/geocoding';
import { openErrorDialog } from '../../components/error-dialog';
import renderDeleteProfileDialogHTML from '../../pages/index/delete-profile-dialog';
import renderProfileReviewDialogHTML from '../../pages/index/profile-review-dialog';
import { resolveContactsFormData } from '../controls/contacts/init';
import { resolveGroupsFormData } from '../controls/groups/init';

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
      const response = await apiFetch(`/users/${getToken()?.user.id}`, { method: 'DELETE' });
      if (!response.ok)
      {
        openErrorDialog(response.statusText);
        return;
      }

      await navigate('/login');
    });

    const cancel = dialog.querySelector('[data-name="delete-profile-cancel"]') as HTMLButtonElement;
    cancel.addEventListener('click', () => dialog.remove());
  });

  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

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
      const dialog = toElement<HTMLDialogElement>(renderProfileReviewDialogHTML());
      document.body.appendChild(dialog);

      dialog.onclose = () => dialog.remove();
      dialog.showModal();
    }
  });
};
