import { init, navigate } from 'apps-web/client';

import { apiFetch } from '../../common/api';

init['[data-init="password-reset-form"]'] = async element =>
{
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const formData = new FormData(element as HTMLFormElement);

    const queryParams = new URLSearchParams(window.location.search);
    formData.set('key', queryParams.get('key') as string);

    await apiFetch('/password-reset', {
      method: 'PUT',
      body: formData
    });

    await navigate('/login');
  });
};
