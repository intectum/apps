import moment from 'moment-timezone';

import { CalendarEvent } from './types';

export const loadGapi = (): Promise<void> => new Promise(resolve => gapi.load('client', resolve));

export async function getEvents(from: moment.Moment, to: moment.Moment): Promise<CalendarEvent[]>
{
  gapi.client.setApiKey('AIzaSyCzrT2Q6uG7f3mhRhHL_vE2djaiTSzN-2c');
  await gapi.client.load('calendar', 'v3');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await (gapi.client as any).calendar.events.list(
    {
      'calendarId': 'info@osho.nz',
      'maxResults': 50,
      'timeMin': from.toISOString(),
      'timeMax': to.toISOString(),
      'singleEvents': true
    }
  );

  return response.result.items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((item: any): CalendarEvent => (
      {
        id: item.id,
        summary: item.summary,
        description: item.description,
        location: item.location,
        start: moment.tz(item.start.dateTime, 'Pacific/Auckland'),
        end: moment.tz(item.end.dateTime, 'Pacific/Auckland')
      }
    ))
    .sort((a: CalendarEvent, b: CalendarEvent) => a.start.diff(b.start));
}

export const geocode = (address: string) =>
  new Promise<google.maps.LatLng | undefined>(resolve =>
    new google.maps.Geocoder().geocode({ address }, results =>
      resolve(results?.[0].geometry.location)));
