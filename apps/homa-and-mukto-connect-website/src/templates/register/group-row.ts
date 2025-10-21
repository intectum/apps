import { Group } from 'homa-and-mukto-connect-core';

import strings from '../../common/strings';
import renderDropdownHTML from '../dropdown';
import renderMinusSvg from '../icons/minus';

const yearOptions: Record<string, string> = {};
for (let year = new Date().getFullYear(); year >= 2000; year--)
{
  yearOptions[year.toString()] = year.toString();
}

const renderGroupRowHTML = (initialValue: Group | undefined, index: number) => `
  <div is="hm-register-group-row" class="u-fr u-justify--space-between u-align--center u-gap--sm" data-name="group">
    <div class="u-fr u-f1 u-gap--sm u-wrap">
      <div style="width: 205px;">
        ${renderDropdownHTML(`group-${index}-type`, initialValue?.type ?? '', strings.groupTypes, true, 'Choose a group')}
      </div>
      <div style="width: 180px;">
        ${renderDropdownHTML(`group-${index}-location`, initialValue?.location ?? '', strings.groupLocations, true, 'Choose a location')}
      </div>
      <div style="width: 170px;">
        ${renderDropdownHTML(`group-${index}-month`, initialValue?.month.toString() ?? '', strings.months, true, 'Choose a month')}
      </div>
      <div style="width: 155px;">
        ${renderDropdownHTML(`group-${index}-year`, initialValue?.year.toString() ?? '', yearOptions, true, 'Choose a year')}
      </div>
    </div>
    <button type="button" class="c-button c-button--icon" ${index === 0 ? 'disabled="true"' : ''} data-action="remove-group">
      ${renderMinusSvg()}
    </button>
  </div>
`;

export default renderGroupRowHTML;
