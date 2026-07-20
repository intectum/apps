import renderFooterHTML from '../components/footer.template';
import renderHeaderHTML from '../components/header.template';

const renderPageHTML = () => `
  <div data-require-auth="" class="u-cover-screen u-fc">
    ${renderHeaderHTML()}
    <main class="u-fc u-f1">
      <div data-init="map" class="u-f1"></div>
    </main>
    ${renderFooterHTML()}
  </div>
`;

export default renderPageHTML;
