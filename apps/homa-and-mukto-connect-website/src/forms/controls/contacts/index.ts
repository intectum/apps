import { mapToHTML } from 'apps-web';
import { Contact } from 'homa-and-mukto-connect-core';

import renderPlusSvg from '../../../icons/plus';
import renderContactRowHTML from './row';

const renderContactsControlHTML = (initialValue?: Contact[]) => `
  ${initialValue ? mapToHTML(initialValue, (group, index) => renderContactRowHTML(group, index)) : renderContactRowHTML(undefined, 0)}
  <div class="u-fr--reversed">
    <button data-name="add-contact" type="button" class="c-button c-button--icon">
      ${renderPlusSvg()}
    </button>
  </div>
`;

export default renderContactsControlHTML;
