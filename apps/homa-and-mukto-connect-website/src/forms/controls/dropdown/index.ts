import { mapToHTML } from 'apps-web';

import renderChevronDownSvg from '../../../icons/chevron-down';
import renderDropdownOptionHTML from './option';

const renderDropdownControlHTML = (name: string, initialValue: string, options: Record<string, string>, required?: boolean, placeholder?: string) => `
  <div data-init="dropdown" class="u-fc" style="position: relative;">
    <input data-name="dropdown-value" name="${name}" value="${initialValue}" style="display: none;" />
    <input data-name="dropdown-input" value="${options[initialValue] ?? initialValue}" title="Select a value from the list" placeholder="${placeholder ?? ''}" ${required ? 'required=""' : ''} style="padding-right: 40px;" />
    <div class="u-p--sm" style="position: absolute; right: 0; top: 0; height: 100%; pointer-events: none;">
      ${renderChevronDownSvg()}
    </div>
    <div data-name="dropdown-options" class="u-fc u-w--full" style="position: absolute; top: 100%; z-index: 1; max-height: 200px; overflow: auto; border: 1px solid black; background-color: white; opacity: 0; pointer-events: none; transition: opacity .25s">
      ${mapToHTML(Object.keys(options), key => renderDropdownOptionHTML(key, options[key]))}
    </div>
  </div>
`;

export default renderDropdownControlHTML;
