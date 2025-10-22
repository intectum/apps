import { init, navigate } from 'apps-web/client';

import { apiFetch } from '../../../common/api';

init['[data-init="verify-email"]'] = async () =>
{
  const queryParams = new URLSearchParams(window.location.search);

  await apiFetch('/registrations', {
    method: 'PUT',
    body: `"${queryParams.get('key')}"`
  });

  await navigate('/register/review');
};
