import { defineBasisAnchor, defineBasisDialog, enableLiveReload } from 'apps-web/client';

import { defineEvent } from './components/event';
import { defineEvents } from './components/events';
import { defineQuote } from './components/quote';

defineBasisAnchor();
defineBasisDialog();

defineEvent();
defineEvents();
defineQuote();

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
