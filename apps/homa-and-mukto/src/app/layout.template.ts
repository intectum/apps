import { LayoutHTMLRenderer } from 'based';

const renderLayoutHTML: LayoutHTMLRenderer = (js: string, css: string, pageHTML: string) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>App - Homa & Mukto</title>
      <link rel="shortcut icon" href="/images/logo.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Connect with participants from Homa & Mukto's groups and trainings" />
      <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
      <style>${css}</style>
    </head>
    <body data-name="page-container">
      ${pageHTML}
      <script>${js}</script>
    </body>
  </html>
`;

export default renderLayoutHTML;
