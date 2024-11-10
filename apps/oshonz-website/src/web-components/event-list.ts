import { DateTime } from 'luxon';

import { getInstructionUrl, getShortAddress } from '../common/data';
import { Event } from '../common/types';

class OSHOEventList extends HTMLElement
{
  events?: Event[] = undefined;

  async connectedCallback()
  {
    if (!this.events) return;

    const eventTemplate = document.querySelector('.c-event__template') as HTMLTemplateElement;

    for (const event of this.events)
    {
      const eventContainer = eventTemplate.content.cloneNode(true) as HTMLElement;

      const eventTitle = eventContainer.querySelector('.c-event__title') as HTMLElement;
      eventTitle.appendChild(document.createTextNode(event.summary));

      if (event.description.includes('CANCELLED'))
      {
        const cancelled = document.createElement('div');
        cancelled.className = 'u-danger';
        cancelled.innerText = 'Sorry this meditation has been CANCELLED';
        eventTitle.appendChild(cancelled);
      }

      const eventAddress = eventContainer.querySelector('.c-event__address') as HTMLElement;
      eventAddress.innerText = getShortAddress(event.address) ?? '';

      const eventTime = eventContainer.querySelector('.c-event__time') as HTMLElement;
      eventTime.innerText = DateTime.fromISO(event.start).toFormat('EEEE, MMMM d @ h:mm a');

      const eventOpen = eventContainer.querySelector('.c-event__open') as HTMLElement;
      eventOpen.onclick = () => this.openEvent(event);

      this.appendChild(eventContainer);
    }
  }

  openEvent(event: Event)
  {
    const eventDialogTemplate = document.querySelector('.c-event-dialog__template') as HTMLTemplateElement;
    const eventDialogContainer = eventDialogTemplate.content.cloneNode(true) as HTMLElement;

    const eventBody = eventDialogContainer.querySelector('.c-event-dialog__body') as HTMLElement;

    const eventTitle = eventDialogContainer.querySelector('.c-event-dialog__title') as HTMLElement;
    eventTitle.appendChild(document.createTextNode(event.summary));

    if (event.description.includes('CANCELLED'))
    {
      const cancelled = document.createElement('div');
      cancelled.className = 'u-danger';
      cancelled.innerText = 'Sorry this meditation has been CANCELLED';
      eventTitle.appendChild(cancelled);
    }

    const eventAddress = eventDialogContainer.querySelector('.c-event-dialog__address') as HTMLElement;
    eventAddress.appendChild(document.createTextNode(`${getShortAddress(event.address)} (`));

    const eventAddressLink = document.createElement('a', { is: 'basis-a' });
    eventAddressLink.href = `https://www.google.com/maps?q=${encodeURIComponent(event.address)}`;
    eventAddressLink.innerText = 'open map';
    eventAddress.appendChild(eventAddressLink);

    eventAddress.appendChild(document.createTextNode(')'));

    const eventTime = eventDialogContainer.querySelector('.c-event-dialog__time') as HTMLElement;
    eventTime.innerText = DateTime.fromISO(event.start).toFormat('EEEE, MMMM d @ h:mm a');

    const instructionsUrl = getInstructionUrl(event.summary);
    if (instructionsUrl)
    {
      const eventInstructionsLink = document.createElement('a', { is: 'basis-a' });
      eventInstructionsLink.href = `https://www.google.com/maps?q=${encodeURIComponent(event.address)}`;
      eventInstructionsLink.innerText = 'Read the full instructions here';
      eventBody.appendChild(eventInstructionsLink);
    }

    if (event.description)
    {
      const description = event.description
        .replace('CANCELLED', '')
        .trim()
        .replace(/\n/g, '<br>');

      const eventDescription = document.createElement('div');
      eventDescription.innerText = description;
      eventBody.appendChild(eventDescription);
    }

    const eventDialog = document.querySelector('.c-event-dialog') as HTMLDialogElement;
    const lastEventDialogChild = eventDialog.lastElementChild;
    if (lastEventDialogChild?.classList.contains('c-event-dialog__body'))
    {
      lastEventDialogChild.remove();
    }
    eventDialog.appendChild(eventDialogContainer);
    eventDialog.showModal();
  }
}

customElements.define('osho-event-list', OSHOEventList);

export default OSHOEventList;
