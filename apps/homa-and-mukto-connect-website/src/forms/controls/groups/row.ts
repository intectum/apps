import { Group } from 'homa-and-mukto-connect-core';

import strings from '../../../common/strings';
import renderMinusSvg from '../../../icons/minus';
import renderDropdownControlHTML from '../../controls/dropdown';

const yearOptions: Record<string, string> = {};
for (let year = new Date().getFullYear(); year >= 2000; year--)
{
  yearOptions[year.toString()] = year.toString();
}

const renderGroupRowHTML = (initialValue: Group | undefined, index: number) => `
  <div data-name="group" data-init="removable" class="u-fr u-justify--space-between u-align--center u-gap--sm">
    <div class="u-fr u-f1 u-gap--sm u-wrap">
      <div style="width: 205px;">
        ${renderDropdownControlHTML(`group-${index}-type`, initialValue?.type ?? '', strings.groupTypes, true, 'Choose a group')}
      </div>
      <div style="width: 180px;">
        ${renderDropdownControlHTML(`group-${index}-location`, initialValue?.location ?? '', strings.groupLocations, true, 'Choose a location')}
      </div>
      <div style="width: 170px;">
        ${renderDropdownControlHTML(`group-${index}-month`, initialValue?.month.toString() ?? '', strings.months, true, 'Choose a month')}
      </div>
      <div style="width: 155px;">
        ${renderDropdownControlHTML(`group-${index}-year`, initialValue?.year.toString() ?? '', yearOptions, true, 'Choose a year')}
      </div>
    </div>
    <button type="button" class="c-button c-button--icon" ${index === 0 ? 'disabled="true"' : ''} data-init="remove">
      ${renderMinusSvg()}
    </button>
  </div>
`;

export default renderGroupRowHTML;
