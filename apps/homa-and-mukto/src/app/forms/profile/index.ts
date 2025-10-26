import { FullUser } from '../../../common/types';
import renderAddressDropdownControlHTML from '../controls/address-dropdown';
import renderContactsControlHTML from '../controls/contacts';
import renderGroupsControlHTML from '../controls/groups';
import renderImageControlHTML from '../controls/image';

const renderProfileFormHTML = (user: FullUser) => `
  <form data-init="profile-form" class="u-fc u-gap--lg">
    <div class="u-fc u-gap--sm">
      <label for="name">Name</label>
      <input name="name" required="" value="${user.pending?.name ?? user.name}" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="image">Photo</label>
      ${renderImageControlHTML(user.pending?.image ?? user.image)}
    </div>
    <div class="u-fc u-gap--sm">
      <div>
        <label for="address">Location</label>
        <div class="u-text-small">Where can people find you?</div>
      </div>
      ${renderAddressDropdownControlHTML(user.address?.meta?.formatted_address ?? '')}
    </div>
    <div class="u-fc u-gap">
      <div>
        <label>Contact details</label>
        <div class="u-text-small">How can people get in touch with you?</div>
      </div>
      ${renderContactsControlHTML(user.contacts)}
    </div>
    <div class="u-fc u-gap">
      <label>Groups attended</label>
      ${renderGroupsControlHTML(user.groups)}
    </div>
    <button class="c-button c-button--primary">Save</button>
    <button data-name="profile-form-remove" type="button" class="c-button c-button--danger">Delete account</button>
  </form>
`;

export default renderProfileFormHTML;
