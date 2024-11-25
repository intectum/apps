import { toElement } from 'apps-web';
import { BasisDialog } from 'apps-web/client';

import clients from '../data/clients';
import renderClientDialogHTML from '../templates/client-dialog';

export class ProjectDialog extends BasisDialog
{
  connectedCallback()
  {
    super.connectedCallback();

    const openClient = this.querySelector<HTMLButtonElement>('[data-action="open-client"]');
    if (openClient)
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

export const defineProjectDialog = () =>
  customElements.define('intectum-project-dialog', ProjectDialog, { extends: 'dialog' });
