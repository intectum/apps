import renderFormHTML from './form';

const renderPageHTML = () => `
  <main class="u-container u-cover-screen u-fc u-center">
    ${renderFormHTML()}
  </main>
`;

export default renderPageHTML;
