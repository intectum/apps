import { DateTime } from 'luxon';

import { getGeocodedEvents } from '../common/data';
import OSHOEventList from './event-list';
import OSHOEventMap from './event-map';

class OSHOEvents extends HTMLElement
{
  async connectedCallback()
  {
    this.className = 'o-row c-events';
    this.innerText = 'Searching for meditations...';

    const timeMin = DateTime.now().setZone('Pacific/Auckland').startOf('week').toISO() ?? undefined;
    const timeMax = DateTime.now().setZone('Pacific/Auckland').endOf('week').toISO() ?? undefined;

    const events = await getGeocodedEvents(timeMin, timeMax);
    if (!events.length)
    {
      this.innerText = 'Oops! There\'s nothing here yet. Please check again later or join the mailing list (below) to get notified.';
      return;
    }

    this.innerText = '';

    const eventListContainer = document.createElement('div');
    eventListContainer.className = 'u-f1';
    this.appendChild(eventListContainer);

    const eventList = document.createElement('osho-event-list') as OSHOEventList;
    eventList.className = 'o-column';
    eventList.events = events;
    eventListContainer.appendChild(eventList);

    const eventMapContainer = document.createElement('div');
    eventMapContainer.className = 'u-f1';
    this.appendChild(eventMapContainer);

    const eventMap = document.createElement('osho-event-map') as OSHOEventMap;
    eventMap.className = 'u-aspect--16-9';
    eventMap.events = events;
    eventMapContainer.appendChild(eventMap);
  }
}

customElements.define('osho-events', OSHOEvents);
