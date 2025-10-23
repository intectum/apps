import { init, navigate } from 'apps-web/client';

import { apiFetch } from '../../../common/api';
import { openErrorDialog } from '../../../components/error-dialog';

init['[data-init="verify-email"]'] = async () =>
{
  const queryParams = new URLSearchParams(window.location.search);

  const response = await apiFetch('/registrations', {
    method: 'PUT',
    body: `"${queryParams.get('key')}"`
  });

  if (!response.ok)
  {
    openErrorDialog(response.statusText);
    return;
  }

  await navigate('/register/review');
};
