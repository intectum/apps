import { Contact } from '../../../../common/types';
import renderMinusSvg from '../../../icons/minus';
import strings from '../../../util/strings';
import renderDropdownControlHTML from '../../controls/dropdown';

const renderContactRowHTML = (initialValue: Contact | undefined, rowId: number) => `
  <div data-name="contact" data-init="contacts-control-row" class="u-fr u-justify--space-between u-align--center u-gap--sm">
    <div class="u-fr u-f1 u-gap--sm u-wrap">
      <div style="width: 155px;">
        ${renderDropdownControlHTML(`contact-${rowId}-type`, initialValue?.type ?? '', strings.contacts, true, 'Choose a type')}
      </div>
      <input name="contact-${rowId}-value" value="${initialValue?.value ?? ''}" required="" class="u-f1" />
    </div>
    <button data-name="contacts-control-row-remove" type="button" class="c-button c-button--icon">
      ${renderMinusSvg()}
    </button>
  </div>
`;

export default renderContactRowHTML;
