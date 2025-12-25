import { getState, init, setState, toArrayElements, toElements } from 'based/client';

import { AddressComponent, User } from '../../types';
import { openErrorDialog } from '../components/error-dialog.template';
import { renderUsersDialogAddressHTML, renderUsersDialogUserHTML } from './index.page.users-dialog.template';
import { addresses, getMatchingAddressComponents } from '../util/addresses';
import { apiFetch } from '../util/api';

init['[data-init="user-dialog"]'] = async element =>
{
  element.addEventListener('state', async () =>
  {
    const state = getState<{ userIds?: string[], addressComponents: AddressComponent[] }>(element);
    if (!state) return;

    const titleElement = element.querySelector('[data-name="user-dialog-title"]') as Element;
    titleElement.innerHTML = `Friends in ${state.addressComponents[0].long_name}`;

    const addressElement = element.querySelector('[data-name="user-dialog-address"]') as Element;
    addressElement.innerHTML = '';

    const addressComponentElements = toElements(renderUsersDialogAddressHTML(state.addressComponents));
    for (const addressComponentElement of addressComponentElements)
    {
      addressElement.appendChild(addressComponentElement);
      if (addressComponentElement instanceof HTMLButtonElement)
      {
        addressComponentElement.addEventListener('click', () =>
        {
          setState(element, { addressComponents: state.addressComponents.slice(Number(addressComponentElement.getAttribute('data-address-index'))) });
        });
      }
    }

    const params = new URLSearchParams();
    if (state.userIds)
    {
      params.append('ids', state.userIds.join(','));
    }
    else
    {
      const matchingAddresses = addresses.filter(address =>
        getMatchingAddressComponents(address.meta?.address_components ?? [], state.addressComponents).length === state.addressComponents.length);
      params.append('ids', matchingAddresses.map(address => address.user_id).join(','));
    }

    const usersResponse = await apiFetch(`/users?${params}`);
    if (!usersResponse.ok)
    {
      openErrorDialog(usersResponse.statusText);
      return;
    }

    const users = await usersResponse.json() as User[];
    users.sort((a, b) => a.name.localeCompare(b.name));

    const usersElement = element.querySelector('[data-name="user-dialog-users"]') as HTMLElement;
    toArrayElements(usersElement, users, 'data-user-id', user => user.id, renderUsersDialogUserHTML);
  });
};
