import { enableLiveReload } from 'apps-web';
import 'apps-web/src/components/a';
import 'apps-web/src/components/dialog';

import './components/event';
import './components/events';
import './components/page';

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
