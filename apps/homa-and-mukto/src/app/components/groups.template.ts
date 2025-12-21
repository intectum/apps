import { mapToHTML } from 'based';

import { Group } from '../../types';
import strings from '../util/strings';

const renderGroupsHTML = (groups: Group[]) =>
  mapToHTML(groups, group => `<div>${strings.groupTypes[group.type]} @ ${strings.groupLocations[group.location]}, ${strings.months[group.month]} ${group.year}</div>`);

export default renderGroupsHTML;
