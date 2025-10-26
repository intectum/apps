import { init } from 'apps-web/client';

import { autocomplete } from '../../../util/places';
import { setOptions } from '../dropdown/init';

init['[data-init="address-dropdown-control"]'] = async element =>
{
  const input = element.querySelector('[data-name="dropdown-input"]') as HTMLInputElement;

  let abortController: AbortController | undefined = undefined;

  const search = async () =>
  {
    abortController?.abort();

    const value = input.value;
    if (!value.length)
    {
      return;
    }

    abortController = new AbortController();
    const suggestions = await autocomplete(value, abortController.signal);
    if (!abortController.signal.aborted)
    {
      const options: Record<string, string> = {};
      for (const suggestion of suggestions)
      {
        options[suggestion.placePrediction.text.text] = suggestion.placePrediction.text.text;
      }

      setOptions(element.children[0] as HTMLElement, options);
    }
  };

  input.addEventListener('input', () => search());

  search();
};
