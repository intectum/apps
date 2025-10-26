const renderPasswordForgotFormHTML = () => `
  <form data-init="password-forgot-form" class="u-fc u-gap--lg">
    <div class="u-fc u-gap--sm">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required="" />
    </div>
    <button class="c-button c-button--primary">Reset password</button>
  </form>
`;

export default renderPasswordForgotFormHTML;
