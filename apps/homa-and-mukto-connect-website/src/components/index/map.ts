import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { toElement } from 'apps-web';
import { Address, User } from 'homa-and-mukto-connect-core';

import renderUserMarkerHTML from '../../templates/index/user-marker';
import renderUsersDialogHTML from '../../templates/index/users-dialog';

setOptions({ key: process.env.PUBLIC_GOOGLE_API_KEY ?? '' });

export class Map extends HTMLDivElement
{
  async connectedCallback()
  {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}') as User;

    const mapsLibrary = await importLibrary('maps') as google.maps.MapsLibrary;
    const markerLibrary = await importLibrary('marker') as google.maps.MarkerLibrary;

    const map = new mapsLibrary.Map(
      this,
      {
        mapId: '8925320d55c5e8fbaa00df39',
        cameraControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoom: 10,
        center: { lat: user.address?.latitude ?? 0, lng: user.address?.longitude ?? 0 }
      }
    );

    const addressesResponse = await fetch('http://localhost:8000/addresses');
    const addresses: Address[] = await addressesResponse.json();

    const openUserDialog = async (userIds: number[]) =>
    {
      const params = new URLSearchParams();
      params.append('ids', userIds.join(','));

      const usersResponse = await fetch(`http://localhost:8000/users?${params}`);
      const users: User[] = await usersResponse.json();

      const dialog = toElement<HTMLDialogElement>(renderUsersDialogHTML(users));
      document.body.appendChild(dialog);

      dialog.onclose = () => dialog.remove();
      dialog.showModal();
    };

    const markers: google.maps.marker.AdvancedMarkerElement[] = [];
    for (const address of addresses)
    {
      const marker = new markerLibrary.AdvancedMarkerElement({
        position: { lat: address.latitude, lng: address.longitude },
        content: toElement(renderUserMarkerHTML(1, address.user_id)),
        gmpClickable: true
      });

      marker.addEventListener('click', () => openUserDialog([ address.user_id ]));

      markers.push(marker);
    }

    new MarkerClusterer({
      markers,
      map,
      renderer: {
        render: cluster => new markerLibrary.AdvancedMarkerElement({
          position: cluster.position,
          content: toElement(renderUserMarkerHTML(cluster.count))
        })
      },
      onClusterClick: (_, cluster) =>
      {
        const userIds: number[] = [];
        for (const marker of cluster.markers)
        {
          const element = (marker as google.maps.marker.AdvancedMarkerElement).content as Element;
          userIds.push(Number(element.attributes.getNamedItem('data-user-id')?.value));
        }

        openUserDialog(userIds);
      }
    });
  }
}

export const defineHomeMap = () =>
  customElements.define('hm-home-map', Map, { extends: 'div' });
