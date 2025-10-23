import renderLoginFormHTML from '../../forms/login';

const renderPageHTML = () => `
  <main class="u-container u-cover-screen u-fc u-center">
    ${renderLoginFormHTML()}
  </main>
`;

export default renderPageHTML;
