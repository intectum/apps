import { Address, GeocodeResponse, New } from 'homa-and-mukto-connect-core';

export const geocode = async (address: string): Promise<New<Address> | undefined> =>
{
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.PUBLIC_GOOGLE_API_KEY}&address=${encodeURIComponent(address)}`);
  const responseData = (await response.json()) as GeocodeResponse;

  if (!responseData.results.length)
  {
    console.warn(`Address not found (${address})`);
    return undefined;
  }

  const result = responseData.results[0];
  if (!result)
  {
    console.warn(`Valid address not found (${address})`);
    return undefined;
  }

  return {
    latitude: result.geometry.location.lat,
    longitude: result.geometry.location.lng,
    meta: {
      address_components: result.address_components,
      formatted_address: result.formatted_address
    },
    user_id: 0
  };
};
