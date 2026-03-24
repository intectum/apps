const renderPageHTML = () => `
  <main class="u-container u-cover-screen u-fc u-center u-gap">
    <form data-init="password-forgot-form" class="u-fc u-gap--lg">
      <img src="/images/logo-vertical.png" alt="Homa & Mukto" style="width: 200px; align-self: center;" />
      <div class="u-fc u-gap--sm">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required="" />
      </div>
      <button class="c-button c-button--primary">Reset password</button>
    </form>
  </main>
`;

export default renderPageHTML;
