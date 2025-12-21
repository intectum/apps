import { init, navigate } from 'based/client';

import { openErrorDialog } from '../../components/error-dialog.template';
import { apiFetch } from '../../util/api';

init['[data-init="verify-email"]'] = async () =>
{
  const searchParams = new URLSearchParams(window.location.search);

  const response = await apiFetch('/registrations', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchParams.get('key'))
  });

  if (!response.ok)
  {
    openErrorDialog(response.statusText);
    return;
  }

  await navigate('/register/review');
};
