import { LayoutHTMLRenderer } from 'apps-web';

const renderLayoutHTML: LayoutHTMLRenderer = (js: string, css: string, pageHTML: string) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Trusty Paws</title>
      <link rel="shortcut icon" href="/logo-paw.svg">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="Trusted local pet sitting in London">

      <script src="https://kit.fontawesome.com/cbfad0a2d9.js" crossorigin="anonymous"></script>
      <link rel="manifest" href="/manifest.json" crossorigin="use-credentials">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Calistoga&display=swap" />
      <style>${css}</style>
    </head>
    <body>
      <header>
        <div class="u-theme--blue u-fr u-align--center u-justify--space-between u-p--lg">
          <img src="/logo-full.svg" alt="Trusty paws" height="60px" />
          <a is="basis-a" class="c-button u-rounded u-theme--blue-inverted" href="/#contact-form">Contact us</a>
        </div>
      </header>
      <main class="u-theme--main">
        ${pageHTML}
      </main>
      <script>${js}</script>
    </body>
  </html>
`;

export default renderLayoutHTML;
