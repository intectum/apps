import { enableLiveReload } from 'apps-web';
import 'apps-web/src/components/a';

import './components/contact-form';
import './components/page';

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
