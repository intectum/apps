const renderPageHTML = () => `
  <main class="u-container u-cover-screen u-fc u-center">
    <form data-init="login-form" class="c-card u-fc u-gap--lg">
      <div class="u-fc u-gap--sm">
        <label for="username">Email</label>
        <input id="username" name="username" type="email" required="" />
      </div>
      <div class="u-fc u-gap--sm">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required="" />
        <a href="/login/password/forgot" class="u-text-small u-blue-light">Forgot your password?</a>
      </div>
      <button class="c-button c-button--primary">Login</button>
      <a href="/register" class="c-button c-button--secondary">Register</a>
    </form>
  </main>
`;

export default renderPageHTML;
