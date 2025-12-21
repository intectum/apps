import { mapToHTML } from 'based';

import { Group } from '../../types';
import renderPlusSvg from '../icons/plus';
import renderGroupRowHTML from './groups.control.row.template';

const renderGroupsControlHTML = (initialValue?: Group[]) => `
  <div data-init="groups-control" class="u-fc u-gap">
    ${initialValue ? mapToHTML(initialValue, (group, index) => renderGroupRowHTML(group, index)) : renderGroupRowHTML(undefined, 0)}
    <div class="u-fr--reversed">
      <button data-name="groups-control-add" type="button" class="c-button c-button--icon">
        ${renderPlusSvg()}
      </button>
    </div>
  </div>
`;

export default renderGroupsControlHTML;
