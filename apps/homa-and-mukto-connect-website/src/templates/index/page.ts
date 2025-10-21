import renderArrowRightFromBracketSvg from '../icons/arrow-right-from-bracket';
import renderProfilePhotoHTML from '../profile-photo';
import renderMapHTML from './map';

const renderPageHTML = () => `
  <div is="hm-authenticated-page" class="u-cover-screen u-fc">
    <header class="u-fr u-justify--space-between u-align--center u-px--lg u-py">
      <div>Homa & Mukto</div>
      <div class="u-fr u-align--center u-gap">
        <button is="hm-home-profile-toggle" type="button" class="c-button c-button--icon" data-name="profile">
          ${renderProfilePhotoHTML()}
        </button>
        <button is="hm-home-logout" type="button" class="c-button c-button--icon" style="border: none;" data-name="logout">
          ${renderArrowRightFromBracketSvg()}
        </button>
      </div>
    </header>
    <main class="u-fc u-f1">
      ${renderMapHTML()}
    </main>
  </div>
`;

export default renderPageHTML;
