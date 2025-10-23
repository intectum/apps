import { FullUser } from 'homa-and-mukto-core';

import renderContactsHTML from '../../components/contacts';
import renderGroupsHTML from '../../components/groups';

const renderAdminRowHTML = (user: FullUser) => `
  <tr data-id="${user.id}">
    <td class="u-p--sm">
      ${user.name} ${user.pending?.name ? `=> ${user.pending?.name}` : ''}
    </td>
    <td class="u-p--sm">
      ${user.email}
    </td>
    <td class="u-p--sm">
      <img src="${user.image}" alt="Me" class="u-rounded--full u-aspect--1 u-bg-aqua" style="width: 128px; object-fit: cover;" />
      ${user.pending?.image ? `=> <img src="${user.pending?.image}" alt="Me" class="u-rounded--full u-aspect--1 u-bg-aqua" style="width: 128px; object-fit: cover;" />` : ''}
    </td>
    <td class="u-p--sm">
      ${renderContactsHTML(user.contacts)}
    </td>
    <td class="u-p--sm">
      ${renderGroupsHTML(user.groups)}
    </td>
    <td class="u-p--sm">
      <button data-name="activate" type="button" class="c-button c-button--primary">Activate</button>
    </td>
  </tr>
`;

export default renderAdminRowHTML;
