import { BasisDialog, toElement } from 'apps-web';

import clients from '../data/clients';
import renderClientDialogHTML from '../templates/client-dialog';

class ProjectDialog extends BasisDialog
{
  connectedCallback()
  {
    super.connectedCallback();

    const openClient = this.querySelector<HTMLButtonElement>('[data-action="open-client"]');
    if (openClient)
    {
      openClient.onclick = () =>
      {
        const clientSlug = openClient.getAttribute('data-client-slug');
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

customElements.define('intectum-project-dialog', ProjectDialog, { extends: 'dialog' });
