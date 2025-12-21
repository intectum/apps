import { mapToHTML } from 'based';
import { init } from 'based/client';

import { prepareOptions } from './dropdown.control.template';
import renderDropdownOptionHTML from './dropdown.control.option.template';

init['[data-init="dropdown"]'] = async element =>
{
  const value = element.querySelector('[data-name="dropdown-value"]') as HTMLInputElement;
  const input = element.querySelector('[data-name="dropdown-input"]') as HTMLInputElement;
  const options = element.querySelector('[data-name="dropdown-options"]') as HTMLDivElement;

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
        value.dispatchEvent(new Event('change'));
        break;
      }
    }
  });

  initOptions(element);
};

export const setOptions = (element: HTMLElement, options: Record<string, string> | [string, string][]) =>
{
  const optionsElement = element.querySelector('[data-name="dropdown-options"]') as HTMLDivElement;
  optionsElement.innerHTML = mapToHTML(prepareOptions(options), option => renderDropdownOptionHTML(option[0], option[1]));

  initOptions(element);
};

const initOptions = (element: HTMLElement) =>
{
  const input = element.querySelector('[data-name="dropdown-input"]') as HTMLInputElement;
  const options = element.querySelector('[data-name="dropdown-options"]') as HTMLDivElement;

  const values: string[] = [];
  for (const option of options.children)
  {
    values.push(option.textContent);
    option.addEventListener('click', () =>
    {
      input.value = option.textContent;
      input.dispatchEvent(new Event('change'));
    });
  }

  input.pattern = values.join('|');
};
