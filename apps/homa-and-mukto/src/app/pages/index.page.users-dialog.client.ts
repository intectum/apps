import { getState, init, setState } from 'apps-web/client';
import { AddressComponent, User } from '../../types';
import { mergeElementsFromArray, toElements } from 'apps-web';
import { renderUsersDialogAddressHTML, renderUsersDialogUserHTML } from './index.page.users-dialog.template';
import { addresses, getMatchingAddressComponents } from '../util/addresses';
import { apiFetch } from '../util/api';
import { openErrorDialog } from '../components/error-dialog.template';

init['[data-init="user-dialog"]'] = async element =>
{
  element.addEventListener('state', async () =>
  {
    const state = getState<{ addressComponents: AddressComponent[] }>(element);
    if (!state) return;

    const matchingAddresses = addresses.filter(address =>
      getMatchingAddressComponents(address.meta?.address_components ?? [], state.addressComponents).length === state.addressComponents.length);

    const params = new URLSearchParams();
    params.append('ids', matchingAddresses.map(address => address.user_id).join(','));

    const usersResponse = await apiFetch(`/users?${params}`);
    if (!usersResponse.ok)
    {
      openErrorDialog(usersResponse.statusText);
      return;
    }

    const users = await usersResponse.json() as User[];
    users.sort((a, b) => a.name.localeCompare(b.name));

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

    const usersElement = element.querySelector('[data-name="user-dialog-users"]') as HTMLElement;
    mergeElementsFromArray(usersElement, users, 'data-user-id', user => user.id, renderUsersDialogUserHTML);
  });
};
