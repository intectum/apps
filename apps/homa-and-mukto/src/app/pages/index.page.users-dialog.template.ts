import { mapToHTML } from 'apps-web';

import { User } from '../../types';
import renderContactsHTML from '../components/contacts.template';
import renderGroupsHTML from '../components/groups.template';

const renderUsersDialogHTML = (users: User[]) => `
  <dialog is="basis-dialog" class="c-user-grid u-p">
    ${mapToHTML(users, user => `
      <div class="u-fc u-align--center u-gap--sm u-text-center">
        <img src="${user.image}" alt="Me" class="u-rounded--full u-aspect--1" style="width: 128px;" loading="lazy" />
        <h2>${user.name}</h2>
        ${renderContactsHTML(user.contacts)}
      </div>
      <div class="u-fc u-gap--sm">
        <h3>Groups attended</h3>
        ${renderGroupsHTML(user.groups)}
      </div>
    `)}
  </dialog>
`;

export default renderUsersDialogHTML;
