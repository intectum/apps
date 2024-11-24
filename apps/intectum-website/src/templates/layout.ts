import { intectumThemes } from 'apps-core';

import renderLogoHTML from './logo';
import renderThemeSelectorHTML from './theme-selector';

const bodyStyle = `
  color-scheme: light dark;
  --color-back: light-dark(${intectumThemes.stone.back}, ${intectumThemes.stone.front});
  --color-middle: ${intectumThemes.stone.middle};
  --color-front: light-dark(${intectumThemes.stone.front}, ${intectumThemes.stone.back});
  --color-accent: ${intectumThemes.water.accent};
`;

const renderLayoutHTML = (pageHTML: string) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>intectum</title>
      <link rel="shortcut icon" href="/images/logo.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Senior developer with 17 years of experience" />

      <script src="/index.js" defer=""></script>
      <script src="https://kit.fontawesome.com/9c65acfa69.js" crossorigin="anonymous"></script>
      <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|PT+Serif&display=swap" />
      <link rel="stylesheet" href="/index.css" />
    </head>
    <body class="u-panel" style="${bodyStyle}">
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
      <main data-section="page-container">
        ${pageHTML}
      </main>
    </body>
  </html>
`;

export default renderLayoutHTML;