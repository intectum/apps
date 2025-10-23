import { Group } from 'homa-and-mukto-core';

import strings from '../../../common/strings';
import renderMinusSvg from '../../../icons/minus';
import renderDropdownControlHTML from '../../controls/dropdown';

const yearOptions: [string, string][] = [];
for (let year = new Date().getFullYear(); year >= 2000; year--)
{
  yearOptions.push([ year.toString(), year.toString() ]);
}

const renderGroupRowHTML = (initialValue: Group | undefined, rowId: number) => `
  <div data-name="group" data-init="groups-control-row" class="u-fr u-justify--space-between u-align--center u-gap--sm">
    <div class="u-fr u-f1 u-gap--sm u-wrap">
      <div style="width: 205px;">
        ${renderDropdownControlHTML(`group-${rowId}-type`, initialValue?.type ?? '', strings.groupTypes, true, 'Choose a group')}
      </div>
      <div style="width: 180px;">
        ${renderDropdownControlHTML(`group-${rowId}-location`, initialValue?.location ?? '', strings.groupLocations, true, 'Choose a location')}
      </div>
      <div style="width: 170px;">
        ${renderDropdownControlHTML(`group-${rowId}-month`, initialValue?.month.toString() ?? '', strings.months, true, 'Choose a month')}
      </div>
      <div style="width: 155px;">
        ${renderDropdownControlHTML(`group-${rowId}-year`, initialValue?.year.toString() ?? '', yearOptions, true, 'Choose a year')}
      </div>
    </div>
    <button data-name="groups-control-row-remove" type="button" class="c-button c-button--icon">
      ${renderMinusSvg()}
    </button>
  </div>
`;

export default renderGroupRowHTML;
