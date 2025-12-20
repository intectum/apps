import { init, toElement } from 'based/client';

import clients from '../data/clients';
import renderClientDialogHTML from './client-dialog.template';

init['[data-name="clients"]'] = element =>
{
  const openClientAll = element.querySelectorAll<HTMLButtonElement>('[data-name="client"]');
  for (const openClient of openClientAll)
  {
    openClient.addEventListener('click', () =>
    {
      const clientSlug = openClient.dataset.clientSlug;
      const client = clients.find(theClient => theClient.slug === clientSlug);
      if (client)
      {
        const dialog = toElement<HTMLDialogElement>(renderClientDialogHTML(client));
        element.appendChild(dialog);

        dialog.onclose = () => dialog.remove();
        dialog.showModal();
      }
    });
  }
};
