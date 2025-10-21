import { mapToHTML } from 'apps-web';

import { renderDropdownOptionHTML } from '../templates/dropdown';

export class Dropdown extends HTMLDivElement
{
  async connectedCallback()
  {
    const value = this.querySelector('[data-name="dropdown-value"]') as HTMLInputElement;
    const input = this.querySelector('[data-name="dropdown-input"]') as HTMLInputElement;
    const options = this.querySelector('[data-name="dropdown-options"]') as HTMLDivElement;

    input.addEventListener('focus', () =>
    {
      options.style.opacity = '1';
      options.style.pointerEvents = '';
    });

    input.addEventListener('blur', () =>
    {
      options.style.opacity = '0';
      setTimeout(() => options.style.pointerEvents = 'none', 250);
    });

    input.addEventListener('input', () =>
    {
      let exactMatch = false;
      for (const option of options.children)
      {
        if (option.textContent === input.value)
        {
          exactMatch = true;
          break;
        }
      }

      for (const option of options.children)
      {
        const searchMatch = option.textContent.toLowerCase().includes(input.value.toLowerCase());
        (option as HTMLElement).style.display = exactMatch || searchMatch ? '' : 'none';
      }
    });

    input.addEventListener('change', () =>
    {
      value.value = '';
      for (const option of options.children)
      {
        if (option.textContent === input.value)
        {
          value.value = option.getAttribute('data-key') ?? '';
          break;
        }
      }
    });

    this.init();
  }

  setOptions(options: Record<string, string>)
  {
    const optionsElement = this.querySelector('[data-name="dropdown-options"]') as HTMLDivElement;
    optionsElement.innerHTML = mapToHTML(Object.keys(options), key => renderDropdownOptionHTML(key, options[key]));

    this.init();
  }

  init()
  {
    const input = this.querySelector('[data-name="dropdown-input"]') as HTMLInputElement;
    const optionsElement = this.querySelector('[data-name="dropdown-options"]') as HTMLDivElement;

    const values: string[] = [];
    for (const option of optionsElement.children)
    {
      values.push(option.textContent);
      option.addEventListener('click', () =>
      {
        input.value = option.textContent;
        input.dispatchEvent(new Event('change'));
      });
    }

    input.pattern = values.join('|');
  }
}

export const defineDropdown = () =>
  customElements.define('hm-dropdown', Dropdown, { extends: 'div' });
