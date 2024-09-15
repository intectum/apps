import { Loader } from '@googlemaps/js-api-loader';

import { Event } from './types';

const loader = new Loader({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '' });

let geocoding: google.maps.GeocodingLibrary | undefined;
export const getGeocodingLibrary = async () =>
{
  if (!geocoding)
  {
    geocoding = await loader.importLibrary('geocoding');
  }

  return geocoding;
};

let maps: google.maps.MapsLibrary | undefined;
export const getMapsLibrary = async () =>
{
  if (!maps)
  {
    maps = await loader.importLibrary('maps');
  }

  return maps;
};

export const getEvents = async (calendarId: string, maxResults?: number, orderBy?: string, singleEvents?: boolean, timeMin?: string, timeMax?: string) =>
{
  const searchParams = new URLSearchParams();
  searchParams.set('key', process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '');
  maxResults && searchParams.set('maxResults', String(maxResults));
  orderBy && searchParams.set('orderBy', orderBy);
  singleEvents && searchParams.set('singleEvents', String(singleEvents));
  timeMin && searchParams.set('timeMin', timeMin);
  timeMax && searchParams.set('timeMax', timeMax);

  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${searchParams.toString()}`);
  const responseData = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return responseData.items.map((item: any) => ({
    id: item.id ?? '',
    summary: item.summary ?? '',
    description: item.description ?? '',
    address: item.location ?? '',
    start: item.start?.dateTime ?? '',
    end: item.end?.dateTime ?? ''
  })) as Event[];
};
