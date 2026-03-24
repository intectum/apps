import { passwordRegex } from '../../../util/data';
import strings from '../../../util/strings';

const renderPageHTML = () => `
  <main class="u-container u-cover-screen u-fc u-center u-gap">
    <form data-init="password-reset-form" class="u-fc u-gap--lg">
      <img src="/images/logo-vertical.png" alt="Homa & Mukto" style="width: 200px; align-self: center;" />
      <div class="u-fc u-gap--sm">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" title="${strings.forms.passwordTitle}" pattern="${passwordRegex}" required="" />
      </div>
      <button class="c-button c-button--primary">Reset password</button>
    </form>
  </main>
`;

export default renderPageHTML;
