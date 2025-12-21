import { mapToHTML } from 'based';

import { AddressComponent, User } from '../../types';
import renderContactsHTML from '../components/contacts.template';
import renderGroupsHTML from '../components/groups.template';

const renderUsersDialogHTML = () => `
  <dialog data-init="user-dialog" class="u-fc u-align--start u-gap u-p">
    <div data-name="user-dialog-address" class="u-fr u-wrap u-gap--xs"></div>
    <div data-name="user-dialog-users" class="u-fr u-wrap u-gap"></div>
  </dialog>
`;

export const renderUsersDialogAddressHTML = (addressComponents: AddressComponent[]) => `
  ${mapToHTML(addressComponents.slice().reverse(), (addressComponent, index) => `
    <button data-address-index="${addressComponents.length - index - 1}" type="button" class="u-aqua">${addressComponent.long_name}</button>
    ${index < addressComponents.length - 1 ? '<div>/</div>' : ''}
  `)}
`;

export const renderUsersDialogUserHTML = (user: User) => `
  <div data-user-id="${user.id}" class="u-fc u-fr-lg u-gap u-p" style="border: 1px solid black;">
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
