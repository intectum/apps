import { mapToHTML } from 'apps-web';
import { Contact } from 'homa-and-mukto-core';

import renderPlusSvg from '../../../icons/plus';
import renderContactRowHTML from './row';

const renderContactsControlHTML = (initialValue?: Contact[]) => `
  <div data-init="contacts-control" class="u-fc u-gap">
    ${initialValue ? mapToHTML(initialValue, (group, index) => renderContactRowHTML(group, index)) : renderContactRowHTML(undefined, 0)}
    <div class="u-fr--reversed">
      <button data-name="contacts-control-add" type="button" class="c-button c-button--icon">
        ${renderPlusSvg()}
      </button>
    </div>
  </div>
`;

export default renderContactsControlHTML;
