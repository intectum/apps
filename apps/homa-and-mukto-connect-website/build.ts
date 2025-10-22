import { build } from 'apps-web/tools';

import renderLayoutHTML from './src/layout';
import renderIndexPageHTML from './src/pages/index';
import renderLoginPageHTML from './src/pages/login';
import renderLoginPasswordEmailPageHTML from './src/pages/login/password/email';
import renderLoginPasswordForgotPageHTML from './src/pages/login/password/forgot';
import renderLoginPasswordResetPageHTML from './src/pages/login/password/reset';
import renderRegisterPageHTML from './src/pages/register';
import renderRegisterEmailPageHTML from './src/pages/register/email';
import renderRegisterReviewPageHTML from './src/pages/register/review';
import renderRegisterVerifyPageHTML from './src/pages/register/verify';

(async function()
{
  console.log('staring build...');
  const startTime = performance.now();

  await build(
    renderLayoutHTML,
    {
      'index': renderIndexPageHTML,
      'login': renderLoginPageHTML,
      'login/password/email': renderLoginPasswordEmailPageHTML,
      'login/password/forgot': renderLoginPasswordForgotPageHTML,
      'login/password/reset': renderLoginPasswordResetPageHTML,
      'register': renderRegisterPageHTML,
      'register/email': renderRegisterEmailPageHTML,
      'register/review': renderRegisterReviewPageHTML,
      'register/verify': renderRegisterVerifyPageHTML
    }
  );

  console.log(`build completed in ${Math.round(performance.now() - startTime)}ms`);
})();
