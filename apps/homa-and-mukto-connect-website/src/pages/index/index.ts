import renderArrowRightFromBracketSvg from '../../icons/arrow-right-from-bracket';

const renderPageHTML = () => `
  <div data-init="require-auth" class="u-cover-screen u-fc">
    <header class="u-fr u-justify--space-between u-align--center u-px--lg u-py">
      <div>Homa & Mukto</div>
      <div class="u-fr u-align--center u-gap">
        <button data-init="profile-toggle" type="button" class="c-button c-button--icon">
          <img data-init="user-image" src="" alt="Me" class="u-rounded--full u-aspect--1" style="width: 32px;" />
        </button>
        <button data-init="logout" is="hm-home-logout" type="button" class="c-button c-button--icon" style="border: none;">
          ${renderArrowRightFromBracketSvg()}
        </button>
      </div>
    </header>
    <main class="u-fc u-f1">
      <div data-init="map" class="u-f1"></div>
    </main>
  </div>
`;

export default renderPageHTML;
