import { Contact } from 'homa-and-mukto-connect-core';

import strings from '../../../common/strings';
import renderMinusSvg from '../../../icons/minus';
import renderDropdownControlHTML from '../../controls/dropdown';

const renderContactRowHTML = (initialValue: Contact | undefined, index: number) => `
  <div data-init="contacts-control-row" data-name="contact" data-init="removable" class="u-fr u-justify--space-between u-align--center u-gap--sm">
    <div class="u-fr u-f1 u-gap--sm u-wrap">
      <div style="width: 155px;">
        ${renderDropdownControlHTML(`contact-${index}-type`, initialValue?.type ?? '', strings.contacts, true, 'Choose a type')}
      </div>
      <input name="contact-${index}-value" value="${initialValue?.value ?? ''}" required="" class="u-f1" />
    </div>
    <button type="button" class="c-button c-button--icon" ${index === 0 ? 'disabled="true"' : ''} data-init="remove">
      ${renderMinusSvg()}
    </button>
  </div>
`;

export default renderContactRowHTML;
