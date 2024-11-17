import renderLogoHTML from './logo';
import renderThemeSelectorHTML from './theme-selector';

const renderBodyHTML = (mainHTML: string) => `
  <div class="c-background u-fc u-center">
    ${renderLogoHTML('c-background__logo')}
  </div>
  <header>
    <div class="u-panel u-fr u-justify--space-between u-align--center u-p">
      <nav class="u-fr u-gap u-align--center">
        <a is="basis-a" href="/" title="Home">
          <div class="c-circle u-panel u-hide-md">
            ${renderLogoHTML()}
          </div>
          <div class="u-text-large u-show-md">intectum</div>
        </a>
        <a is="basis-a" href="/projects" title="Projects">
          <div class="c-circle u-panel u-hide-md">
            <i class="fa-solid fa-folder-open u-icon"></i>
          </div>
          <div class="u-show-md">projects</div>
        </a>
      </nav>
      ${renderThemeSelectorHTML()}
    </div>
  </header>
  <main>
    ${mainHTML}
  </main>
`;

export default renderBodyHTML;
