import config from '../config';
import { PlacesAutocompleteResponse } from './types';

export const autocomplete = async (input: string, signal?: AbortSignal) =>
{
  try
  {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${config.googleApiKey}&types=political&locationbias=rectangle:-90,-180|90,180&input=${encodeURIComponent(input)}`,
      { signal }
    );

    if (signal?.aborted)
    {
      return [];
    }

    const responseData = (await response.json()) as PlacesAutocompleteResponse;

    return responseData.predictions;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any)
  {
    if (err.name === 'AbortError')
    {
      return [];
    }

    throw err;
  }
};
