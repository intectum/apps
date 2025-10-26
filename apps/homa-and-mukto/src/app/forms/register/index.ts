import { passwordRegex } from '../../util/data';
import strings from '../../util/strings';
import renderAddressDropdownControlHTML from '../controls/address-dropdown';
import renderContactsControlHTML from '../controls/contacts';
import renderGroupsControlHTML from '../controls/groups';
import renderImageControlHTML from '../controls/image';

const renderRegisterFormHTML = () => `
  <form data-init="register-form" class="u-fc u-gap--lg">
    <div class="u-fc u-gap--sm">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required="" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" title="${strings.forms.passwordTitle}" pattern="${passwordRegex}" required="" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="name">Name</label>
      <input id="name" name="name" required="" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="image">Photo</label>
      ${renderImageControlHTML()}
    </div>
    <div class="u-fc u-gap--sm">
      <div>
        <label for="address">Location</label>
        <div class="u-text-small">Where can people find you?</div>
      </div>
      ${renderAddressDropdownControlHTML('')}
    </div>
    <div class="u-fc u-gap">
      <div>
        <label>Contact details</label>
        <div class="u-text-small">How can people get in touch with you?</div>
      </div>
      ${renderContactsControlHTML()}
    </div>
    <div class="u-fc u-gap">
      <label>Groups attended</label>
      ${renderGroupsControlHTML()}
    </div>
    <div class="u-fr u-justify--center">
      <button class="c-button c-button--primary">Register</button>
    </div>
  </form>
`;

export default renderRegisterFormHTML;
