import { toElement } from 'apps-web';

import clients from '../../data/clients';
import renderClientDialogHTML from '../../templates/client-dialog';

export class Clients extends HTMLDivElement
{
  connectedCallback()
  {
    const openClientAll = this.querySelectorAll<HTMLButtonElement>('[data-action="open-client"]');
    for (const openClient of openClientAll)
    {
      openClient.onclick = () =>
      {
        const clientSlug = openClient.dataset.clientSlug;
        const client = clients.find(theClient => theClient.slug === clientSlug);
        if (client)
        {
          const dialog = toElement<HTMLDialogElement>(renderClientDialogHTML(client));
          if (!dialog) return;

          this.appendChild(dialog);

          dialog.onclose = () => dialog.remove();
          dialog.showModal();
        }
      };
    }
  }
}

export const defineHomeClients = () =>
  customElements.define('intectum-home-clients', Clients, { extends: 'div' });
