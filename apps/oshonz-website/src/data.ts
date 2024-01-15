export async function getQuotes(): Promise<string[]>
{
  const response = await fetch('quotes.json');
  if (!response.ok)
  {
    return [];
  }

  return await response.json();
}

export function getInstructionUrl(summary: string): string | undefined
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

  return undefined;
}

export const getShortLocation = (location: string): string | undefined => location ? location.substring(0, location.indexOf(',')) : undefined;
