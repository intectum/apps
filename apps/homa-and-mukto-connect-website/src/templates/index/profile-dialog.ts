import { mapToHTML } from 'apps-web';
import { User } from 'homa-and-mukto-connect-core';

import renderAddressDropdownHTML from '../address-dropdown';
import renderPlusSvg from '../icons/plus';
import renderContactRowHTML from '../register/contact-row';
import renderGroupRowHTML from '../register/group-row';

const renderProfileDialogHTML = (user: User) => `
  <dialog is="basis-dialog" class="u-p">
    <form is="hm-home-profile-form" class="u-fc u-gap--lg">
      <h2>Profile</h2>
      <div class="u-fc u-gap--sm">
        <label for="name">Name</label>
        <input name="name" required="" value="${user.name}" />
      </div>
      <div class="u-fc u-gap--sm">
        <label for="image">Photo</label>
        <div class="u-fr u-justify--center">
          <button type="button" class="u-rounded--full u-aspect--1 u-bg-aqua" style="width: 128px;" data-action="image-open">
            <img data-name="image" src="${user.image}" alt="Me" class="u-rounded--full u-aspect--1 u-bg-aqua" style="width: 128px; display: block; object-fit: cover;" />
          </button>
        </div>
        <input name="image" type="file" />
      </div>
      <div class="u-fc u-gap--sm">
        <div>
          <label for="address">Location</label>
          <div class="u-text-small">Where can people find you?</div>
        </div>
        ${renderAddressDropdownHTML(user.address?.meta?.formatted_address ?? '')}
      </div>
      <div class="u-fc u-gap" data-name="contacts">
        <div>
          <label>Contact details</label>
          <div class="u-text-small">How can people get in touch with you?</div>
        </div>
        ${mapToHTML(user.contacts, (contact, index) => renderContactRowHTML(contact, index))}
        <div class="u-fr--reversed">
          <button type="button" class="c-button c-button--icon" data-action="add-contact">
            ${renderPlusSvg()}
          </button>
        </div>
      </div>
      <div class="u-fc u-gap" data-name="groups">
        <label>Groups attended</label>
        ${mapToHTML(user.groups, (group, index) => renderGroupRowHTML(group, index))}
        <div class="u-fr--reversed">
          <button type="button" class="c-button c-button--icon" data-action="add-group">
            ${renderPlusSvg()}
          </button>
        </div>
      </div>
      <button class="c-button c-button--primary">Save</button>
      <button type="button" class="c-button c-button--danger" data-name="remove">Delete account</button>
    </form>
  </dialog>
`;

export default renderProfileDialogHTML;
