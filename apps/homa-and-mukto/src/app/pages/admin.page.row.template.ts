import { FullUser } from '../../types';
import renderContactsHTML from '../components/contacts.template';
import renderGroupsHTML from '../components/groups.template';

const renderAdminRowHTML = (user: FullUser) => `
  <tr data-id="${user.id}">
    <td class="u-p--sm">
      <img src="${user.image}" alt="Photo" class="u-rounded--full u-aspect--1 u-bg-blue-light" style="width: 128px; object-fit: cover;" />
      ${user.pending?.image ? `=> <img src="${user.pending?.image}" alt="Photo" class="u-rounded--full u-aspect--1 u-bg-blue-light" style="width: 128px; object-fit: cover;" />` : ''}
    </td>
    <td class="u-p--sm">
      ${user.name} ${user.pending?.name ? `=> ${user.pending?.name}` : ''}
    </td>
    <td class="u-p--sm">
      ${user.email}
    </td>
    <td class="u-p--sm">
      ${renderContactsHTML(user.contacts)}
    </td>
    <td class="u-p--sm">
      ${renderGroupsHTML(user.groups)}
    </td>
    <td class="u-p--sm">
      <div class="u-fc u-gap">
        ${(user.status == 'review' || user.pending) ? `
          <button data-name="accept" type="button" class="c-button c-button--primary">Accept</button>
          <button data-name="deny" type="button" class="c-button c-button--danger">Deny</button>
        ` : `
          <div class="u-px u-py--sm u-bg-blue-light u-light" style="font-family: 'Gilroy Extra Bold', sans-serif; text-transform: uppercase;">${user.status}</div>
        `}
      </div>
    </td>
  </tr>
`;

export default renderAdminRowHTML;
