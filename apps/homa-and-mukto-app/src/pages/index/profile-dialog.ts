import { User } from 'homa-and-mukto-core';

import renderProfileFormHTML from '../../forms/profile';

const renderProfileDialogHTML = (user: User) => `
  <dialog is="basis-dialog" class="u-p">
    <h2>Profile</h2>
    ${renderProfileFormHTML(user)}
  </dialog>
`;

export default renderProfileDialogHTML;
