import { getName } from 'country-list';

import { formatAddress } from '../addresses';
import config from '../config';
import { Address, addressPartsSmallestToBiggest, LatLng } from '../types';
import { GeocodeResponse, GeocodeResult, PlaceType } from './types';

export const geocode = async (address: Address | string, noFallback?: boolean) =>
{
  const formattedAddress = typeof address === 'string' ? address : formatAddress(address, 'long');

  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${config.googleApiKey}&address=${encodeURIComponent(formattedAddress)}`);
  const responseData = (await response.json()) as GeocodeResponse;

  if (!responseData.results.length)
  {
    const fallbackAddress = await geocodeWithFallback(address, noFallback);
    if (!fallbackAddress)
    {
      console.warn(`Address not found (${formattedAddress})`);
      return undefined;
    }

    return fallbackAddress;
  }

  const foundAddress = toAddress(responseData.results[0]);
  if (!foundAddress)
  {
    const fallbackAddress = await geocodeWithFallback(address, noFallback);
    if (!fallbackAddress)
    {
      console.warn(`Valid address not found (${formattedAddress})`);
      return undefined;
    }

    return fallbackAddress;
  }

  return foundAddress;
};

const geocodeWithFallback = async (address: Address | string, noFallback?: boolean): Promise<Address | undefined> =>
{
  const addressWithFallback = typeof address === 'string' ? undefined : { ...address, country: getName(address.country) ?? address.country };
  if (noFallback || !addressWithFallback)
  {
    return undefined;
  }

  return geocode(addressWithFallback, true);
};

export const reverseGeocode = async (location: LatLng) =>
{
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${config.googleApiKey}&result_type=political&latlng=${location.latitude},${location.longitude}`);
  const responseData = (await response.json()) as GeocodeResponse;

  let smallestAddressPartFound = addressPartsSmallestToBiggest.length;
  for (const result of responseData.results)
  {
    const address = toAddress(result);
    if (!address)
    {
      continue;
    }

    for (let index = 0; index < addressPartsSmallestToBiggest.length; index++)
    {
      if (index === smallestAddressPartFound)
      {
        break;
      }

      if (address[addressPartsSmallestToBiggest[index]])
      {
        smallestAddressPartFound = index;
        break;
      }
    }
  }

  const addresses: Address[] = [];
  for (const result of responseData.results)
  {
    const address = toAddress(result);
    if (address?.[addressPartsSmallestToBiggest[smallestAddressPartFound]])
    {
      addresses.push(address);
    }
  }

  return addresses;
};

const toAddress = (result: GeocodeResult) =>
{
  const country = getAddressComponent(result, 'country');
  if (!country?.short_name || !country.long_name)
  {
    return undefined;
  }

  const administrativeAreaLevel1 = getAddressComponent(result, 'administrative_area_level_1');
  const administrativeAreaLevel2 = getAddressComponent(result, 'administrative_area_level_2');
  const administrativeAreaLevel3 = getAddressComponent(result, 'administrative_area_level_3');
  const administrativeAreaLevel4 = getAddressComponent(result, 'administrative_area_level_4');
  const administrativeAreaLevel5 = getAddressComponent(result, 'administrative_area_level_5');
  const administrativeAreaLevel6 = getAddressComponent(result, 'administrative_area_level_6');
  const administrativeAreaLevel7 = getAddressComponent(result, 'administrative_area_level_7');
  const locality = getAddressComponent(result, 'locality');

  const address: Address =
  {
    country: country.short_name,
    administrativeAreaLevel1: administrativeAreaLevel1?.short_name,
    administrativeAreaLevel2: administrativeAreaLevel2?.short_name,
    administrativeAreaLevel3: administrativeAreaLevel3?.short_name,
    administrativeAreaLevel4: administrativeAreaLevel4?.short_name,
    administrativeAreaLevel5: administrativeAreaLevel5?.short_name,
    administrativeAreaLevel6: administrativeAreaLevel6?.short_name,
    administrativeAreaLevel7: administrativeAreaLevel7?.short_name,
    locality: locality?.short_name,
    location:
    {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng
    },
    display:
    {
      country: country.long_name,
      administrativeAreaLevel1: administrativeAreaLevel1?.long_name,
      administrativeAreaLevel2: administrativeAreaLevel2?.long_name,
      administrativeAreaLevel3: administrativeAreaLevel3?.long_name,
      administrativeAreaLevel4: administrativeAreaLevel4?.long_name,
      administrativeAreaLevel5: administrativeAreaLevel5?.long_name,
      administrativeAreaLevel6: administrativeAreaLevel6?.long_name,
      administrativeAreaLevel7: administrativeAreaLevel7?.long_name,
      locality: locality?.long_name
    }
  };

  return address;
};

const getAddressComponent = (result: GeocodeResult, type: PlaceType) =>
  result.address_components.find(theAddressComponent => theAddressComponent.types.includes(type));
