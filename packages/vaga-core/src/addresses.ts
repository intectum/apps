import config from './config';
import { Address, addressPartsSmallestToBiggest } from './types';

export const toAddressKey = (address: Address) =>
  addressPartsSmallestToBiggest
    .map(addressPart => address[addressPart] ?? '')
    .join('/');

export const toCountryOnly = (address: Address): Address =>
  ({
    country: address.country,
    location: address.location,
    display: address.display
      ? { country: address.display.country }
      : undefined
  });

export const toCountryAndLevel1Only = (address: Address): Address =>
  ({
    country: address.country,
    administrativeAreaLevel1: address.administrativeAreaLevel1,
    location: address.location,
    display: address.display
      ? {
        country: address.display.country,
        administrativeAreaLevel1: address.display.administrativeAreaLevel1
      }
      : undefined
  });

export const fromAddressKey = (key: string): Address =>
{
  const address: Address = { country: '' };

  const components = key.split('/');
  for (let index = 0; index < addressPartsSmallestToBiggest.length; index++)
  {
    const addressPart = addressPartsSmallestToBiggest[index];
    if (addressPart === 'country')
    {
      address[addressPart] = components[index];
    }
    else
    {
      address[addressPart] = components[index] || undefined;
    }
  }

  return address;
};

export const formatAddress = (address?: Address, format?: 'short' | 'medium' | 'long'): string =>
{
  if (address?.display)
  {
    const formattedDisplay = formatAddress(address.display, format);
    if (formattedDisplay !== 'Unknown address')
    {
      return formattedDisplay;
    }
  }

  if (!address?.country)
  {
    return 'Unknown address';
  }

  let addressValues = addressPartsSmallestToBiggest.map(addressPart => address[addressPart] ?? '');
  if (format !== 'long')
  {
    const smallestAddressPartFound = addressValues.findIndex(addressValue => !!addressValue);

    if (format === 'short')
    {
      addressValues = [ addressValues[smallestAddressPartFound] ];
    }
    else
    {
      addressValues = [ addressValues[smallestAddressPartFound], address.country ];
    }
  }

  return addressValues
    .filter(addressValue => !!addressValue)
    .join(', ');
};

export const sameAddress = (a: Address, b: Address) =>
{
  for (const addressPart of addressPartsSmallestToBiggest)
  {
    if (a[addressPart]?.toLowerCase() !== b[addressPart]?.toLowerCase())
    {
      return false;
    }
  }

  return true;
};

export const populateAddress = async (address: Address) =>
{
  const fullAddress = await config.addressCache.get(toAddressKey(address));
  if (!fullAddress)
  {
    return;
  }

  address.location = fullAddress.location;
  if (fullAddress.display)
  {
    address.display = { ...fullAddress.display };
  }
};
