import { getMapsLibrary } from '../common/google';
import { Event } from '../common/types';

class OSHOEventMap extends HTMLElement
{
  events?: Event[] = undefined;

  async connectedCallback()
  {
    this.style.display = 'block';

    if (!this.events) return;

    const mapsLibrary = await getMapsLibrary();
    const map = new mapsLibrary.Map(
      this,
      {
        center:
        {
          lat: -36.8485,
          lng: 174.7633
        },
        zoom: 10
      }
    );

    this.events
      .filter(event => event.location)
      .map(event => new google.maps.Marker({
        map,
        title: event.address,
        position: event.location
      }));

    if (this.events.length)
    {
      const bounds = new google.maps.LatLngBounds();
      for (const event of this.events)
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

customElements.define('osho-event-map', OSHOEventMap);

export default OSHOEventMap;
