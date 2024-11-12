import { DateTime } from 'luxon';

import { getGeocodedEvents } from '../common/data';
import { getMapsLibrary } from '../common/google';
import renderOSHOEventsHTML from '../templates/events';

class OSHOEvents extends HTMLElement
{
  async connectedCallback()
  {
    this.className = 'c-events u-fr u-gap';
    this.innerText = 'Searching for meditations...';

    const timeMin = DateTime.now().setZone('Pacific/Auckland').startOf('week').toISO() ?? undefined;
    const timeMax = DateTime.now().setZone('Pacific/Auckland').endOf('week').toISO() ?? undefined;

    const events = await getGeocodedEvents(timeMin, timeMax);
    if (!events.length)
    {
      this.innerText = 'Oops! There\'s nothing here yet. Please check again later or join the mailing list (below) to get notified.';
      return;
    }

    this.innerHTML = renderOSHOEventsHTML(events);

    const eventsMap = this.querySelector('[data-events-map]') as HTMLElement;

    const mapsLibrary = await getMapsLibrary();
    const map = new mapsLibrary.Map(
      eventsMap,
      {
        center:
          {
            lat: -36.8485,
            lng: 174.7633
          },
        zoom: 10
      }
    );

    events
      .filter(event => event.location)
      .map(event => new google.maps.Marker({
        map,
        title: event.address,
        position: event.location
      }));

    if (events.length)
    {
      const bounds = new google.maps.LatLngBounds();
      for (const event of events)
      {
        if (event.location)
        {
          bounds.extend(event.location);
        }
      }

      map.fitBounds(bounds);
    }
  }
}

customElements.define('osho-events', OSHOEvents);
