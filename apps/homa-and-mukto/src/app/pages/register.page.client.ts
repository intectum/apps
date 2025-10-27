import { init, navigate } from 'apps-web/client';

import { openErrorDialog } from '../components/error-dialog.template';
import { resolveContactsFormData } from '../components/contacts.control.client';
import { resolveGroupsFormData } from '../components/groups.control.client';
import { apiFetch } from '../util/api';
import { geocode } from '../util/geocoding';

init['[data-init="register-form"]'] = async element =>
{
  const submitButton = element.querySelector('button') as HTMLButtonElement;

  element.addEventListener('submit', async event =>
  {
    event.preventDefault();
    submitButton.disabled = true;

    try
    {
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
    }
    finally
    {
      submitButton.disabled = false;
    }
  });
};
