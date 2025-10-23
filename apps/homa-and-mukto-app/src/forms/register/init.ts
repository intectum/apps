import { init, navigate } from 'apps-web/client';

import { apiFetch } from '../../common/api';
import { geocode } from '../../common/geocoding';
import { openErrorDialog } from '../../components/error-dialog';
import { resolveContactsFormData } from '../controls/contacts/init';
import { resolveGroupsFormData } from '../controls/groups/init';

init['[data-init="register-form"]'] = async element =>
{
  element.addEventListener('submit', async event =>
  {
    event.preventDefault();

    const formData = new FormData(element as HTMLFormElement);

    const address = await geocode(formData.get('address') as string);
    if (!address) throw Error('ERRRO!'); // TODO

    formData.set('address', JSON.stringify(address));

    const image = element.querySelector('[data-name="image"]') as HTMLImageElement;
    formData.set('image', image.src);

    resolveContactsFormData(formData);
    resolveGroupsFormData(formData);

    const response = await apiFetch('/registrations', {
      method: 'POST',
      body: formData
    });

    if (!response.ok)
    {
      openErrorDialog(response.statusText);
      return;
    }

    await navigate('/register/email');
  });
};
