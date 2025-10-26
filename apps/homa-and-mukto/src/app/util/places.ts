import { PlacesAutocompleteResponse } from '../../common/types';

export const autocomplete = async (input: string, signal?: AbortSignal) =>
{
  try
  {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:autocomplete',
      {
        method: 'POST',
        headers: { 'X-Goog-Api-Key': process.env.PUBLIC_GOOGLE_API_KEY ?? '' },
        body: JSON.stringify({
          input,
          includedPrimaryTypes: 'political',
          locationBias: {
            rectangle: {
              low: {
                latitude: -90,
                longitude: -180
              },
              high: {
                latitude: 90,
                longitude: 180
              }
            }
          }
        }),
        signal
      }
    );

    if (signal?.aborted)
    {
      return [];
    }

    const responseData = (await response.json()) as PlacesAutocompleteResponse;

    return responseData.suggestions;
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
