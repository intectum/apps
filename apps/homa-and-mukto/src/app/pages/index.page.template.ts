import renderHeaderHTML from '../components/header.template';

const renderPageHTML = () => `
  <div data-require-auth="" class="u-cover-screen u-fc">
    ${renderHeaderHTML()}
    <main class="u-fc u-f1">
      <div data-init="map" class="u-f1"></div>
    </main>
  </div>
`;

export default renderPageHTML;
