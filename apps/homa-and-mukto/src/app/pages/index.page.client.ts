import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { toElement } from 'apps-web';
import { init } from 'apps-web/client';

import { Address, User } from '../../types';
import { openErrorDialog } from '../components/error-dialog.template';
import { apiFetch } from '../util/api';
import { getToken } from '../util/data';
import renderUserMarkerHTML from './index.page.user-marker.template';
import renderUsersDialogHTML from './index.page.users-dialog.template';

setOptions({ key: process.env.PUBLIC_GOOGLE_API_KEY ?? '' });

init['[data-init="map"]'] = async element =>
{
  const token = getToken();
  if (!token) return;

  const mapsLibrary = await importLibrary('maps') as google.maps.MapsLibrary;
  const markerLibrary = await importLibrary('marker') as google.maps.MarkerLibrary;

  const map = new mapsLibrary.Map(
    element,
    {
      mapId: '8925320d55c5e8fbaa00df39',
      cameraControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoom: 10,
      center: { lat: token.user.address?.latitude ?? 0, lng: token.user.address?.longitude ?? 0 }
    }
  );

  const addressesResponse = await apiFetch('/addresses');
  if (!addressesResponse.ok)
  {
    openErrorDialog(addressesResponse.statusText);
    return;
  }

  const addresses = await addressesResponse.json() as Address[];

  const openUserDialog = async (userIds: string[]) =>
  {
    const params = new URLSearchParams();
    params.append('ids', userIds.join(','));

    const usersResponse = await apiFetch(`/users?${params}`);
    if (!usersResponse.ok)
    {
      openErrorDialog(usersResponse.statusText);
      return;
    }

    const users = await usersResponse.json() as User[];

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

    marker.addEventListener('click', () =>
    {
      const markerButton = marker.content as HTMLButtonElement;
      markerButton.disabled = true;

      try
      {
        openUserDialog([ address.user_id ]);
      }
      finally
      {
        markerButton.disabled = false;
      }
    });

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
      const userIds: string[] = [];
      for (const marker of cluster.markers)
      {
        const element = (marker as google.maps.marker.AdvancedMarkerElement).content as Element;
        userIds.push(element.attributes.getNamedItem('data-user-id')?.value ?? '');
      }

      openUserDialog(userIds);
    }
  });
};
