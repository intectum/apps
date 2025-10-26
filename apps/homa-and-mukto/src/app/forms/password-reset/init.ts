import { init, navigate } from 'apps-web/client';

import { openErrorDialog } from '../../components/error-dialog';
import { apiFetch } from '../../util/api';

init['[data-init="password-reset-form"]'] = async element =>
{
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const formData = new FormData(element as HTMLFormElement);

    const queryParams = new URLSearchParams(window.location.search);
    formData.set('key', queryParams.get('key') as string);

    const response = await apiFetch('/password-reset', {
      method: 'PUT',
      body: formData
    });

    if (!response.ok)
    {
      openErrorDialog(response.statusText);
      return;
    }

    await navigate('/login');
  });
};
