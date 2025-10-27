import { FullUser } from '../../types';
import renderArrowRightFromBracketSvg from '../icons/arrow-right-from-bracket';
import renderUserTieSvg from '../icons/user-tie';
import renderAddressDropdownControlHTML from './address-dropdown.control.template';
import renderContactsControlHTML from './contacts.control.template';
import renderGroupsControlHTML from './groups.control.template';
import renderImageControlHTML from './image.control.template';

const renderHeaderHTML = () => `
  <header class="u-fr u-justify--space-between u-align--center u-px--lg u-py">
    <a is="basis-a" href="/">Homa & Mukto</a>
    <div class="u-fr u-align--center u-gap">
      <button data-init="header-profile" type="button" title="Profile" class="c-button c-button--icon">
        <img src="" alt="Me" class="u-rounded--full u-aspect--1" style="width: 32px;" />
      </button>
      <a is="basis-a" data-init="header-admin" href="/admin" title="Admin" class="c-button c-button--icon" style="display: none; border: none;">
        ${renderUserTieSvg()}
      </a>
      <button data-init="header-logout" type="button" title="Logout" class="c-button c-button--icon" style="border: none;">
        ${renderArrowRightFromBracketSvg()}
      </button>
    </div>
  </header>
`;

export const renderProfileDialogHTML = (user: FullUser) => `
  <dialog is="basis-dialog" class="u-p">
    <h2>Profile</h2>
    <form data-init="profile-form" class="u-fc u-gap--lg">
      <div class="u-fc u-gap--sm">
        <label for="name">Name</label>
        <input id="name" name="name" required="" value="${user.pending?.name ?? user.name}" />
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
      <button data-name="profile-form-submit" class="c-button c-button--primary">Save</button>
      <button data-name="profile-form-remove" type="button" class="c-button c-button--danger">Delete account</button>
    </form>
  </dialog>
`;

export const renderDeleteProfileDialogHTML = () => `
  <dialog is="basis-dialog" class="u-fc u-gap u-p">
    <h2>Delete account</h2>
    <div>Are you sure you want to delete your account?</div>
    <div class="u-fr u-gap">
      <button data-name="delete-profile" type="button" class="c-button c-button--danger">Delete</button>
      <button data-name="delete-profile-cancel" type="button" class="c-button c-button--secondary">Cancel</button>
    </div>
  </dialog>
`;

export const renderReviewProfileDialogHTML = () => `
  <dialog is="basis-dialog" class="u-fc u-gap u-p">
    <h2>We're reviewing your profile...</h2>
    <div>To ensure everyone's safety on the platform, we will now review your profile to verify that your updated name and/or photo are appropriate.</div>
  </dialog>
`;

export default renderHeaderHTML;
