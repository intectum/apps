import { init, navigate } from 'based/client';

import { openErrorDialog } from '../../../components/error-dialog.template';
import { apiFetch } from '../../../util/api';

init['[data-init="password-forgot-form"]'] = async element =>
{
  const submit = element.querySelector('button') as HTMLButtonElement;

  element.addEventListener('submit', async event =>
  {
    event.preventDefault();
    submit.disabled = true;

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
      submit.disabled = false;
    }
  });
};
