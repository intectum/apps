import { mapToHTML } from 'apps-web';

import renderChevronDownSvg from './icons/chevron-down';

const renderDropdownHTML = (name: string, initialValue: string, options: Record<string, string>, required?: boolean, placeholder?: string) => `
  <div is="hm-dropdown" class="u-fc" style="position: relative;">
    <input name="${name}" value="${initialValue}" style="display: none;" data-name="dropdown-value" />
    <input value="${options[initialValue] ?? initialValue}" title="Select a value from the list" placeholder="${placeholder ?? ''}" ${required ? 'required=""' : ''} style="padding-right: 40px;" data-name="dropdown-input" />
    <div class="u-p--sm" style="position: absolute; right: 0; top: 0; height: 100%; pointer-events: none;">
      ${renderChevronDownSvg()}
    </div>
    <div class="u-fc u-w--full" style="position: absolute; top: 100%; z-index: 1; max-height: 200px; overflow: auto; border: 1px solid black; background-color: white; opacity: 0; pointer-events: none; transition: opacity .25s" data-name="dropdown-options">
      ${mapToHTML(Object.keys(options), key => renderDropdownOptionHTML(key, options[key]))}
    </div>
  </div>
`;

export const renderDropdownOptionHTML = (key: string, value: string) =>
  `<button type="button" class="c-button c-button--plain u-justify--start" style="text-transform: none;" data-name="dropdown-option" data-key="${key}">${value}</button>`;

export default renderDropdownHTML;
