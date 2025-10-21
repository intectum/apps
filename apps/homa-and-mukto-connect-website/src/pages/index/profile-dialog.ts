import { User } from 'homa-and-mukto-connect-core';

import renderProfileFormHTML from '../../forms/profile';

const renderProfileDialogHTML = (user: User) => `
  <dialog is="basis-dialog" class="u-p">
    ${renderProfileFormHTML(user)}
  </dialog>
`;

export default renderProfileDialogHTML;
