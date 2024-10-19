import { getEvents, getGeocodingLibrary } from '../common/google';

export const getGeocodedEvents = async (timeMin?: string, timeMax?: string) =>
{
  const geocoding = await getGeocodingLibrary();
  const events = await getEvents('info@osho.nz', 50, 'startTime', true, timeMin, timeMax);

  const geocodePromises: Promise<void>[] = [];
  for (const event of events)
  {
    geocodePromises.push((async () =>
    {
      event.location = (await new geocoding.Geocoder().geocode({ address: event.address })).results[0]?.geometry.location.toJSON();
    })());
  }

  await Promise.all(geocodePromises);

  return events;
};

export const getShortAddress = (address: string) => address ? address.substring(0, address.indexOf(',')) : undefined;

export const getInstructionUrl = (summary: string) =>
{
  if (summary.toLowerCase().indexOf('chakra breath') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/chakra-breathing-meditation';
  }
  else if (summary.toLowerCase().indexOf('chakra sound') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/chakra-sounds-meditation';
  }
  else if (summary.toLowerCase().indexOf('devavani') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/devavani-meditation';
  }
  else if (summary.toLowerCase().indexOf('dynamic') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/dynamic-meditation';
  }
  else if (summary.toLowerCase().indexOf('evening meeting') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/evening-meeting';
  }
  else if (summary.toLowerCase().indexOf('kundalini') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/kundalini-meditation';
  }
  else if (summary.toLowerCase().indexOf('nadabrahma') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/nadabrahma-meditation';
  }
  else if (summary.toLowerCase().indexOf('nataraj') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/nataraj-meditation>';
  }
  else if (summary.toLowerCase().indexOf('no dimension') !== -1)
  {
    return 'http://www.osho.com/meditate/active-meditations/no-dimensions-meditation';
  }

  return '';
};
