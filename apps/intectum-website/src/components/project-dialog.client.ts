import { init, toElement } from 'based/client';

import clients from '../data/clients';
import renderClientDialogHTML from './client-dialog.template';

init['[data-name="project-dialog"]'] = element =>
{
  const openClient = element.querySelector<HTMLButtonElement>('[data-action="open-client"]');
  if (openClient)
  {
    openClient.onclick = () =>
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
    };
  }
};
