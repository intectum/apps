import { mapToHTML } from 'apps-web';
import { Group } from 'homa-and-mukto-core';

import strings from '../../common/strings';

const renderGroupsHTML = (groups: Group[]) =>
  mapToHTML(groups, group => `<div>${strings.groupTypes[group.type]} @ ${strings.groupLocations[group.location]}, ${strings.months[group.month]} ${group.year}</div>`);

export default renderGroupsHTML;
