import { toElement } from 'apps-web';

import state from '../common/state';
import renderOSHOEventDialogHTML from '../templates/event-dialog';

export class OSHOEvent extends HTMLDivElement
{
  connectedCallback()
  {
    const openButton = this.querySelector<HTMLButtonElement>('[data-action="open"]');
    if (!openButton) return;

    openButton.onclick = () =>
    {
      const eventId = this.dataset.eventId;
      if (!eventId) return;

      const event = state.events?.find(event => event.id === eventId);
      if (!event) return;

      const dialog = toElement<HTMLDialogElement>(renderOSHOEventDialogHTML(event));
      if (!dialog) return;

      this.appendChild(dialog);

      dialog.onclose = () => dialog.remove();
      dialog.showModal();
    };
  }
}

export const defineEvent = () =>
  customElements.define('osho-event', OSHOEvent, { extends: 'div' });
