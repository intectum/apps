import renderProfileFormHTML from '../components/profile-form.template';

const renderPageHTML = () => `
  <main class="u-container u-fc u-align--center">
    ${renderProfileFormHTML('register')}
  </main>
`;

export default renderPageHTML;
