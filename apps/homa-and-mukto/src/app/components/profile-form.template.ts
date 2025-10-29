import { FullUser } from '../../types';
import renderAddressDropdownControlHTML from '../components/address-dropdown.control.template';
import renderContactsControlHTML from '../components/contacts.control.template';
import renderImageControlHTML from '../components/image.control.template';
import renderGroupsControlHTML from '../components/groups.control.template';
import { passwordRegex } from '../util/data';
import strings from '../util/strings';

const renderProfileFormHTML = (name: string, user?: FullUser) => `
  <form data-init="profile-form-${name}" class="u-fc u-gap--lg">
    ${!user ? `
      <div class="u-fc u-gap--sm">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required="" />
      </div>
      <div class="u-fc u-gap--sm">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" title="${strings.forms.passwordTitle}" pattern="${passwordRegex}" required="" />
      </div>
    ` : ''}
    <div class="u-fc u-gap--sm">
      <label for="name">Name</label>
      <input id="name" name="name" required="" value="${user?.pending?.name ?? user?.name ?? ''}" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="image">Photo</label>
      ${renderImageControlHTML(user?.pending?.image ?? user?.image)}
    </div>
    <div class="u-fc u-gap--sm">
      <div>
        <label for="address">Location</label>
        <div class="u-text-small">Where can people find you?</div>
      </div>
      ${renderAddressDropdownControlHTML(user?.address?.meta?.formatted_address)}
    </div>
    <div class="u-fc u-gap">
      <div>
        <label>Contact details</label>
        <div class="u-text-small">How can people get in touch with you?</div>
      </div>
      ${renderContactsControlHTML(user?.contacts)}
    </div>
    <div class="u-fc u-gap">
      <label>Groups attended</label>
      ${renderGroupsControlHTML(user?.groups)}
    </div>
    <button data-name="profile-form-submit" class="c-button c-button--primary">${user ? 'Save' : 'Register'}</button>
    ${user ? '<button data-name="profile-form-remove" type="button" class="c-button c-button--danger">Delete account</button>' : ''}
  </form>
`;

export default renderProfileFormHTML;
