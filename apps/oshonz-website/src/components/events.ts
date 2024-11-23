import { DateTime } from 'luxon';

import { getGeocodedEvents } from '../common/data';
import { getMapsLibrary } from '../common/google';
import state from '../common/state';
import renderOSHOEventsHTML from '../templates/events';

export class OSHOEvents extends HTMLDivElement
{
  async connectedCallback()
  {
    const timeMin = DateTime.now().setZone('Pacific/Auckland').startOf('week').toISO() ?? undefined;
    const timeMax = DateTime.now().setZone('Pacific/Auckland').endOf('week').toISO() ?? undefined;

    state.events = await getGeocodedEvents(timeMin, timeMax);
    if (!state.events.length)
    {
      this.innerText = 'Oops! There\'s nothing here yet. Please check again later or join the mailing list (below) to get notified.';
      return;
    }

    this.innerHTML = renderOSHOEventsHTML(state.events);

    const mapSection = this.querySelector<HTMLElement>('[data-section="map"]');
    if (!mapSection) return;

    const mapsLibrary = await getMapsLibrary();
    const map = new mapsLibrary.Map(
      mapSection,
      {
        center:
          {
            lat: -36.8485,
            lng: 174.7633
          },
        zoom: 10
      }
    );

    state.events
      .filter(event => event.location)
      .map(event => new google.maps.Marker({
        map,
        title: event.address,
        position: event.location
      }));

    if (state.events.length)
    {
      const bounds = new google.maps.LatLngBounds();
      for (const event of state.events)
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

export const defineEvents = () =>
  customElements.define('osho-events', OSHOEvents, { extends: 'div' });
