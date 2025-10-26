import { passwordRegex } from '../../util/data';
import strings from '../../util/strings';

const renderPasswordResetFormHTML = () => `
  <form data-init="password-reset-form" class="u-fc u-gap--lg">
    <div class="u-fc u-gap--sm">
      <label for="password">Password</label>
      <input name="password" type="password" title="${strings.forms.passwordTitle}" pattern="${passwordRegex}" required="" />
    </div>
    <button class="c-button c-button--primary">Reset password</button>
  </form>
`;

export default renderPasswordResetFormHTML;
