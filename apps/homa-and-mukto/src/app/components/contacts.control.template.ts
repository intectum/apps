import { mapToHTML } from 'based';

import { Contact } from '../../types';
import renderContactRowHTML from './contacts.control.row.template';

const renderContactsControlHTML = (initialValue?: Contact[]) => `
  <div data-init="contacts-control" class="u-fc u-gap--lg">
    ${initialValue ? mapToHTML(initialValue, (group, index) => renderContactRowHTML(group, index)) : renderContactRowHTML(undefined, 0)}
    <button data-name="contacts-control-add" type="button" class="c-button c-button--secondary">
      Add another contact
    </button>
  </div>
`;

export default renderContactsControlHTML;
