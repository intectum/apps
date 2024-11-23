import { defineBasisAnchor, enableLiveReload } from 'apps-web/client';

import { defineContactForm } from './components/contact-form';

defineBasisAnchor();

defineContactForm();

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
