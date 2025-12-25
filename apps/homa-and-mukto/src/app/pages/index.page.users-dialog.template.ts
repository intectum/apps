import { mapToHTML } from 'based';

import { AddressComponent, User } from '../../types';
import renderContactsHTML from '../components/contacts.template';
import renderGroupsHTML from '../components/groups.template';

const renderUsersDialogHTML = () => `
  <dialog data-init="user-dialog" class="c-card u-fc u-gap">
    <h2 data-name="user-dialog-title"></h2>
    <div data-name="user-dialog-address" class="u-fr u-align--center u-wrap u-gap--xs"></div>
    <div data-name="user-dialog-users" class="u-g u-g--1-2 u-gap">
      <div class="c-card u-pulse" style="height: 234px; background-color: grey;"></div>
      <div class="c-card u-pulse" style="height: 234px; background-color: grey;"></div>
    </div>
  </dialog>
`;

export const renderUsersDialogAddressHTML = (addressComponents: AddressComponent[]) => `
  ${mapToHTML(addressComponents.slice().reverse(), (addressComponent, index) => `
    <button data-address-index="${addressComponents.length - index - 1}" type="button" class="u-blue-light">${addressComponent.long_name}</button>
    ${index < addressComponents.length - 1 ? '<div>/</div>' : ''}
  `)}
`;

export const renderUsersDialogUserHTML = (user: User) => `
  <div data-user-id="${user.id}" class="c-card u-fc u-fr-lg u-gap">
    <div class="u-fc u-align--center u-gap--sm u-text-center">
      <img src="${user.image}" alt="Photo" class="u-rounded--full u-aspect--1" style="width: 128px;" loading="lazy" />
      <h2>${user.name}</h2>
      ${renderContactsHTML(user.contacts)}
    </div>
    <div class="u-fc u-gap--sm">
      <h3>Groups attended</h3>
      ${renderGroupsHTML(user.groups)}
    </div>
  </div>
`;

export default renderUsersDialogHTML;
