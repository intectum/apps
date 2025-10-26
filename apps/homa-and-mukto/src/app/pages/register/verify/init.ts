import { init, navigate } from 'apps-web/client';

import { openErrorDialog } from '../../../components/error-dialog';
import { apiFetch } from '../../../util/api';

init['[data-init="verify-email"]'] = async () =>
{
  const queryParams = new URLSearchParams(window.location.search);

  const response = await apiFetch('/registrations', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(queryParams.get('key'))
  });

  if (!response.ok)
  {
    openErrorDialog(response.statusText);
    return;
  }

  await navigate('/register/review');
};
