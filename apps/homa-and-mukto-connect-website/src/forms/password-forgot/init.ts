import { init, navigate } from 'apps-web/client';

import { apiFetch } from '../../common/api';
import { openErrorDialog } from '../../components/error-dialog';

init['[data-init="password-forgot-form"]'] = async element =>
{
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const formData = new FormData(element as HTMLFormElement);

    const response = await apiFetch('/password-reset', {
      method: 'POST',
      body: formData
    });

    if (!response.ok)
    {
      openErrorDialog(response.statusText);
      return;
    }

    await navigate('/login/password/email');
  });
};
