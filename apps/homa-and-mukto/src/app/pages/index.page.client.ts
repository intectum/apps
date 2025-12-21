import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { init, setState, toElement } from 'based/client';

import { Address, AddressComponent } from '../../types';
import { openErrorDialog } from '../components/error-dialog.template';
import { addresses, getMatchingAddressComponents } from '../util/addresses';
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

  addresses.length = 0;
  addresses.push(...await addressesResponse.json() as Address[]);

  const openUserDialog = async (userIds: string[], addressComponents: AddressComponent[]) =>
  {
    const dialog = toElement<HTMLDialogElement>(renderUsersDialogHTML());
    setState(dialog, { userIds, addressComponents });
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
        openUserDialog([ address.user_id ], address.meta?.address_components ?? []);
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
      let commonAddressComponents: AddressComponent[] | undefined = undefined;

      for (const marker of cluster.markers)
      {
        const element = (marker as google.maps.marker.AdvancedMarkerElement).content as Element;
        const userId = element.attributes.getNamedItem('data-user-id')?.value ?? '';
        userIds.push(userId);

        const address = addresses.find(address => address.user_id === userId);
        if (!address?.meta) continue;

        if (!commonAddressComponents)
        {
          commonAddressComponents = address.meta.address_components;
        }
        else
        {
          commonAddressComponents = getMatchingAddressComponents(commonAddressComponents, address.meta.address_components);
        }
      }

      openUserDialog(userIds, commonAddressComponents ?? []);
    }
  });
};
