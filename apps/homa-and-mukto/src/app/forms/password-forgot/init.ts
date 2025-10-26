import { init, navigate } from 'apps-web/client';

import { openErrorDialog } from '../../components/error-dialog';
import { apiFetch } from '../../util/api';

init['[data-init="password-forgot-form"]'] = async element =>
{
  const submitButton = element.querySelector('button') as HTMLButtonElement;

  element.addEventListener('submit', async event =>
  {
    event.preventDefault();
    submitButton.disabled = true;

    try
    {
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
    }
    finally
    {
      submitButton.disabled = false;
    }
  });
};
