import renderFormHTML from './form';

const renderPageHTML = () => `
  <main class="u-container u-fc u-align--center">
    ${renderFormHTML()}
  </main>
`;

export default renderPageHTML;
