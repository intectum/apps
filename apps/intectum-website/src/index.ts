import { enableLiveReload } from 'apps-web';
import 'apps-web/src/components/a';
import 'apps-web/src/components/dialog';

import './common/scroll-animations';
import './components/body';
import './components/carousel';
import './components/home/boids';
import './components/home/clients';
import './components/home/projects';
import './components/home/skills';
import './components/project-dialog';
import './components/projects/projects';
import './components/theme-selector';

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
