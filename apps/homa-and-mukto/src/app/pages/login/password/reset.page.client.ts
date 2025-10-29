import { init, navigate } from 'apps-web/client';

import { openErrorDialog } from '../../../components/error-dialog.template';
import { apiFetch } from '../../../util/api';

init['[data-init="password-reset-form"]'] = async element =>
{
  const submit = element.querySelector('button') as HTMLButtonElement;

  element.addEventListener('submit', async event =>
  {
    event.preventDefault();
    submit.disabled = true;

    try
    {
      const searchParams = new URLSearchParams(window.location.search);
      const formData = new FormData(element as HTMLFormElement);

      const response = await apiFetch(`/password-reset?key=${searchParams.get('key')}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok)
      {
        openErrorDialog(response.statusText);
        return;
      }

      await navigate('/login');
    }
    finally
    {
      submit.disabled = false;
    }
  });
};
