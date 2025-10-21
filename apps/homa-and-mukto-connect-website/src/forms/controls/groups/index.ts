import { mapToHTML } from 'apps-web';
import { Group } from 'homa-and-mukto-connect-core';

import renderPlusSvg from '../../../icons/plus';
import renderGroupRowHTML from './row';

const renderGroupsControlHTML = (initialValue?: Group[]) => `
  <div data-init="groups-control">
    ${initialValue ? mapToHTML(initialValue, (group, index) => renderGroupRowHTML(group, index)) : renderGroupRowHTML(undefined, 0)}
    <div class="u-fr--reversed">
      <button data-name="add-group" type="button" class="c-button c-button--icon">
        ${renderPlusSvg()}
      </button>
    </div>
  </div>
`;

export default renderGroupsControlHTML;
