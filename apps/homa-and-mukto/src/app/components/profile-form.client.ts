import { toElement } from 'apps-web';
import { navigate } from 'apps-web/client';

import { Address, User } from '../../types';
import { apiFetch } from '../util/api';
import { getToken } from '../util/data';
import { geocode } from '../util/geocoding';
import { resolveContactsFormData } from './contacts.control.client';
import { openErrorDialog } from './error-dialog.template';
import { resolveGroupsFormData } from './groups.control.client';
import { renderDeleteProfileDialogHTML } from './header.template';

export const initProfileForm = async (element: HTMLFormElement, user?: User, onSubmit?: (response: Response) => void) =>
{
  const remove = element.querySelector('[data-name="profile-form-remove"]') as HTMLButtonElement;
  remove?.addEventListener('click', () =>
  {
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

  const submit = element.querySelector('[data-name="profile-form-submit"]') as HTMLButtonElement;
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();
    submit.disabled = true;

    try
    {
      const formData = new FormData(element);

      const address = await geocode(formData.get('address') as string) as Address;
      if (!address) throw Error('ERRRO!'); // TODO

      if (user?.address) address.id = user.address.id;
      formData.set('address', JSON.stringify(address));

      resolveContactsFormData(formData);
      resolveGroupsFormData(formData);

      const response = await apiFetch(user ? `/users/${user.id}` : '/registrations', {
        method: user ? 'PUT' : 'POST',
        body: formData
      });

      if (!response.ok)
      {
        openErrorDialog(response.statusText);
        return;
      }

      onSubmit?.(response);
    }
    finally
    {
      submit.disabled = false;
    }
  });
};
