import { init, navigate } from 'apps-web/client';
import { Address, User } from 'homa-and-mukto-connect-core';

import { apiFetch, apiFetchJson } from '../../common/api';
import { getToken, getUser } from '../../common/data';
import { geocode } from '../../common/geocoding';
import { resolveContactsFormData } from '../controls/contacts/init';
import { resolveGroupsFormData } from '../controls/groups/init';

init['[data-init="profile-form"]'] = async element =>
{
  const remove = element.querySelector('[data-name="remove"]') as HTMLButtonElement;

  remove.addEventListener('click', async () =>
  {
    await apiFetch(`/users/${getUser().id}`, { method: 'DELETE' });

    navigate('/login');
  });

  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const user = getUser();
    const formData = new FormData(element as HTMLFormElement);

    const address = await geocode(formData.get('address') as string) as Address;
    if (!address) throw Error('ERRRO!'); // TODO

    if (user.address) address.id = user.address.id;
    formData.set('address', JSON.stringify(address));

    const image = element.querySelector('[data-name="image"]') as HTMLImageElement;
    formData.set('image', image.src);

    resolveContactsFormData(formData);
    resolveGroupsFormData(formData);

    const updatedUser = await apiFetchJson<User>(`/users/${user.id}`, {
      method: 'PUT',
      body: formData
    });

    const token = getToken();
    token.user = updatedUser;
    localStorage.setItem('token', JSON.stringify(token));
  });
};
