const renderLoginFormHTML = () => `
  <form data-init="login-form" class="u-fc u-gap--lg">
    <div class="u-fc u-gap--sm">
      <label for="email">Email</label>
      <input name="email" type="email" required="" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="password">Password</label>
      <input name="password" type="password" required="" />
    </div>
    <button class="c-button c-button--primary">Login</button>
    <a is="basis-a" href="/register" class="c-button c-button--secondary">Register</a>
  </form>
`;

export default renderLoginFormHTML;
