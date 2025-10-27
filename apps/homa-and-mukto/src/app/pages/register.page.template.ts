import renderAddressDropdownControlHTML from '../components/address-dropdown.control.template';
import renderContactsControlHTML from '../components/contacts.control.template';
import renderImageControlHTML from '../components/image.control.template';
import renderGroupsControlHTML from '../components/groups.control.template';
import { passwordRegex } from '../util/data';
import strings from '../util/strings';

const renderPageHTML = () => `
  <main class="u-container u-fc u-align--center">
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
  </main>
`;

export default renderPageHTML;
