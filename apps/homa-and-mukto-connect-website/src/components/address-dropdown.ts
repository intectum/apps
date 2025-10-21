import { autocomplete } from '../google-cloud/places';
import { Dropdown } from './dropdown';

export class AddressDropdown extends HTMLDivElement
{
  abortController: AbortController | undefined = undefined;

  async connectedCallback()
  {
    const input = this.querySelector('[data-name="dropdown-input"]') as HTMLInputElement;

    input.addEventListener('input', () => this.search());

    this.search();
  }

  async search()
  {
    const input = this.querySelector('[data-name="dropdown-input"]') as HTMLInputElement;

    this.abortController?.abort();

    const value = input.value;
    if (!value.length)
    {
      return;
    }

    this.abortController = new AbortController();
    const suggestions = await autocomplete(value, this.abortController.signal);
    if (!this.abortController.signal.aborted)
    {
      const options: Record<string, string> = {};
      for (const suggestion of suggestions)
      {
        options[suggestion.placePrediction.text.text] = suggestion.placePrediction.text.text;
      }

      const dropdown = this.children[0] as Dropdown;
      dropdown.setOptions(options);
    }
  }
}

export const defineAddressDropdown = () =>
  customElements.define('hm-address-dropdown', AddressDropdown, { extends: 'div' });
