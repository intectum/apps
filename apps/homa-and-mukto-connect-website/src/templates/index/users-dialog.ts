import { mapToHTML } from 'apps-web';
import { Contact, User } from 'homa-and-mukto-connect-core';

import strings from '../../common/strings';
import renderEnvelopeSvg from '../icons/envelope';
import renderInstagramSvg from '../icons/instagram';
import renderPhoneSvg from '../icons/phone';
import renderWhatsappSvg from '../icons/whatsapp';

const contactIcons: Record<string, string> =
{
  email: renderEnvelopeSvg(),
  instagram: renderInstagramSvg(),
  phone: renderPhoneSvg(),
  whatsapp: renderWhatsappSvg()
};

const renderUsersDialogHTML = (users: User[]) => `
  <dialog is="basis-dialog" class="c-user-grid u-p">
    ${mapToHTML(users, user => `
      <div class="u-fc u-align--center u-gap--sm u-text-center">
        <img src="${user.image}" alt="Me" class="u-rounded--full u-aspect--1" style="width: 128px;" loading="lazy" />
        <h2>${user.name}</h2>
        ${mapToHTML(user.contacts, contact => `
          <a is="basis-a" href="${toLink(contact)}" class="u-fr u-gap--sm">
            <div>${contactIcons[contact.type]}</div>
            <div>${contact.value}</div>
          </a>
        `)}
      </div>
      <div class="u-fc u-gap--sm">
        <h3>Groups attended</h3>
        ${mapToHTML(user.groups, group => `<div>${strings.groupTypes[group.type]} @ ${strings.groupLocations[group.location]}, ${strings.months[group.month]} ${group.year}</div>`)}
      </div>
    `)}
  </dialog>
`;

const toLink = (contact: Contact) =>
{
  if (contact.type === 'email')
  {
    return `mailto://${contact.value}`;
  }

  if (contact.type === 'instagram')
  {
    return `https://instagram.com/${contact.value}`;
  }

  if (contact.type === 'phone')
  {
    return `tel://${contact.value}`;
  }

  if (contact.type === 'whatsapp')
  {
    return `https://wa.me/${contact.value}`;
  }

  return undefined;
};

export default renderUsersDialogHTML;
