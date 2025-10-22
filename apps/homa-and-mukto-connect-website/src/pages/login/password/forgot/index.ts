import renderPasswordForgotFormHTML from '../../../../forms/password-forgot';

const renderPageHTML = () => `
  <main class="u-container u-cover-screen u-fc u-center u-gap">
    ${renderPasswordForgotFormHTML()}
  </main>
`;

export default renderPageHTML;
