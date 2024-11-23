import renderOSHOQuoteHTML from './quote';

const renderLayoutHTML = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>OSHO Auckland</title>
      <link rel="shortcut icon" href="/favicon.ico">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="OSHO Information Center: Auckland, New Zealand">

      <script src="/index.js" defer=""></script>
      <script src="https://kit.fontawesome.com/9c65acfa69.js" crossorigin="anonymous"></script>
      <link rel="manifest" href="/manifest.json" crossorigin="use-credentials">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" />
      <link rel="stylesheet" href="/index.css" />
    </head>
    <body class="u-cover-screen u-fc u-gap">
      <header class="u-invert">
        <div class="u-container u-py">
          <img src="/logo.png" alt="OSHO" />
          <h1>Information Center</h1>
          Auckland, New Zealand
        </div>
      </header>

      <main class="u-container u-fc u-f1 u-gap">
        ${renderOSHOQuoteHTML()}
        <div class="u-fc u-gap">
          <h2>OSHO Active Meditations</h2>
          <p>Everyone is welcome to come and experience OSHO's active meditations! They are designed to help modern people enter into meditation. To learn more, see <a is="basis-a" href="https://www.osho.com/meditation/osho-active-meditations/why-active-meditations">Why active meditations?</a> We host meditations at a few locations so make sure you come to the right one :P</p>
          <p><strong><em>Please arrive ten minutes before the meditation starts. It is best to join the mailing list (below) so that we can notify you if we have a cancellation.</em></strong></p>
          <h3>This week's meditations</h3>
          <div is="osho-events" class="c-events u-fc u-gap">
            Searching for meditations...
          </div>
        </div>
      </main>

      <footer class="u-fc u-gap">
        <div class="u-container u-fc u-gap u-w--full">
          <h2>Got questions? Want to join the mailing list?</h2>
          <p>Don't hesitate to contact Gyan at <a is="basis-a" href="mailto:info@osho.nz">info@osho.nz</a>. For more information about Osho, you can also go to <a is="basis-a" href="https://www.osho.com">www.osho.com</a>.</p>
        </div>

        <div class="u-invert">
          <div class="u-container u-py">
            <div>
              <small>
                OSHO is a registered trademark of Osho International Foundation, used with permission, <a is="basis-a" class="u-light" href="https://www.osho.com/trademarks">www.osho.com/trademarks</a>
              </small>
            </div>
            <div>
              <small>
                Some material used here (images and text excerpts) is Copyright &copy; OSHO International Foundation, <a is="basis-a" class="u-light" href="https://www.osho.com/copyright">www.osho.com/copyright</a>
              </small>
            </div>
          </div>
        </div>
      </footer>
    </body>
  </html>
`;

export default renderLayoutHTML;
