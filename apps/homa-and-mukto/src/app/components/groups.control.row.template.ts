import { Group } from '../../types';
import renderTrashSvg from '../icons/trash';
import strings from '../util/strings';
import renderDropdownControlHTML from './dropdown.control.template';

const yearOptions: [string, string][] = [];
for (let year = new Date().getFullYear(); year >= 2000; year--)
{
  yearOptions.push([ year.toString(), year.toString() ]);
}

const renderGroupRowHTML = (initialValue: Group | undefined, rowId: number) => `
  <div data-name="group" data-init="groups-control-row" class="u-fr u-justify--space-between u-align--center u-gap--sm">
    <div class="u-fr u-f1 u-gap--sm u-wrap">
      <div class="u-f1">
        ${renderDropdownControlHTML(`group-${rowId}-type`, strings.groupTypes, initialValue?.type ?? '', true, 'Choose a group')}
      </div>
      <div class="u-f1">
        ${renderDropdownControlHTML(`group-${rowId}-location`, { ...strings.groupLocations, 'other': 'Other' }, initialValue?.location ?? '', true, 'Choose a location')}
      </div>
      <div class="u-f1">
        ${renderDropdownControlHTML(`group-${rowId}-month`, strings.months, initialValue?.month.toString() ?? '', true, 'Choose a month')}
      </div>
      <div class="u-f1">
        ${renderDropdownControlHTML(`group-${rowId}-year`, yearOptions, initialValue?.year.toString() ?? '', true, 'Choose a year')}
      </div>
    </div>
    <button data-name="groups-control-row-remove" type="button" class="c-button c-button--icon">
      ${renderTrashSvg()}
    </button>
  </div>
`;

export default renderGroupRowHTML;
