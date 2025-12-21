import { FullUser } from '../../types';
import renderArrowRightFromBracketSvg from '../icons/arrow-right-from-bracket';
import renderUserTieSvg from '../icons/user-tie';
import renderProfileFormHTML from './profile-form.template';

const renderHeaderHTML = () => `
  <header class="u-fr u-justify--space-between u-align--center u-px--lg u-py" style="border-bottom: 2px solid var(--color-dark);">
    <a href="/">Homa & Mukto</a>
    <div class="u-fr u-align--center u-gap">
      <button data-init="header-profile" type="button" title="Profile" class="c-button c-button--icon">
        <img data-init="user-image" src="" alt="Me" class="u-rounded--full u-aspect--1" style="width: 32px;" />
      </button>
      <a data-init="header-admin" href="/admin" title="Admin" class="c-button c-button--icon" style="display: none; border: none;">
        ${renderUserTieSvg()}
      </a>
      <button data-init="header-logout" type="button" title="Logout" class="c-button c-button--icon" style="border: none;">
        ${renderArrowRightFromBracketSvg()}
      </button>
    </div>
  </header>
`;

export const renderProfileDialogHTML = (user: FullUser) => `
  <dialog class="c-card">
    <h2>Profile</h2>
    ${renderProfileFormHTML('header', user)}
  </dialog>
`;

export const renderDeleteProfileDialogHTML = () => `
  <dialog class="c-card u-fc u-gap">
    <h2>Delete account</h2>
    <div>Are you sure you want to delete your account?</div>
    <div class="u-fr u-gap">
      <button data-name="delete-profile" type="button" class="c-button c-button--danger">Delete</button>
      <button data-name="delete-profile-cancel" type="button" class="c-button c-button--secondary">Cancel</button>
    </div>
  </dialog>
`;

export const renderReviewProfileDialogHTML = () => `
  <dialog class="c-card u-fc u-gap">
    <h2>We're reviewing your profile...</h2>
    <div>To ensure everyone's safety on the platform, we will now review your profile to verify that your updated name and/or photo are appropriate.</div>
  </dialog>
`;

export default renderHeaderHTML;
