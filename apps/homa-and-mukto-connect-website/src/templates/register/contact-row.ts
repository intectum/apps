import { Contact } from 'homa-and-mukto-connect-core';

import strings from '../../common/strings';
import renderDropdownHTML from '../dropdown';
import renderMinusSvg from '../icons/minus';

const renderContactRowHTML = (initialValue: Contact | undefined, index: number) => `
  <div is="hm-register-contact-row" class="u-fr u-justify--space-between u-align--center u-gap--sm" data-name="contact">
    <div class="u-fr u-f1 u-gap--sm u-wrap">
      <div style="width: 155px;">
        ${renderDropdownHTML(`contact-${index}-type`, initialValue?.type ?? '', strings.contacts, true, 'Choose a type')}
      </div>
      <input name="contact-${index}-value" value="${initialValue?.value ?? ''}" required="" class="u-f1" />
    </div>
    <button type="button" class="c-button c-button--icon" ${index === 0 ? 'disabled="true"' : ''} data-action="remove-contact">
      ${renderMinusSvg()}
    </button>
  </div>
`;

export default renderContactRowHTML;
