import renderPasswordResetFormHTML from '../../../../forms/password-reset';

const renderPageHTML = () => `
  <main class="u-container u-cover-screen u-fc u-center u-gap">
    ${renderPasswordResetFormHTML()}
  </main>
`;

export default renderPageHTML;
