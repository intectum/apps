import { mapToHTML } from 'apps-web';

import { Contact } from '../../types';
import renderEnvelopeSvg from '../icons/envelope';
import renderInstagramSvg from '../icons/instagram';
import renderPhoneSvg from '../icons/phone';
import renderWhatsappSvg from '../icons/whatsapp';

const renderContactsHTML = (contacts: Contact[]) =>
  mapToHTML(contacts, contact => `
    <a is="basis-a" href="${toLink(contact)}" class="u-fr u-gap--sm">
      ${icons[contact.type]}
      <div>${contact.value}</div>
    </a>
  `);

const icons: Record<string, string> =
{
  email: renderEnvelopeSvg(),
  instagram: renderInstagramSvg(),
  phone: renderPhoneSvg(),
  whatsapp: renderWhatsappSvg()
};

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

export default renderContactsHTML;
