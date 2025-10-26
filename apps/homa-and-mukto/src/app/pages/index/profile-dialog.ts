import { FullUser } from '../../../common/types';
import renderProfileFormHTML from '../../forms/profile';

const renderProfileDialogHTML = (user: FullUser) => `
  <dialog is="basis-dialog" class="u-p">
    <h2>Profile</h2>
    ${renderProfileFormHTML(user)}
  </dialog>
`;

export default renderProfileDialogHTML;
