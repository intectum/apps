import { addDialogs, addNavigation, applyInit, enableLiveReload } from 'based/client';

import { activateScrollAnimations } from './common/scroll-animations';

addDialogs();
addNavigation();

import './pages/projects.client';

import './components/boids.client';
import './components/carousel.client';
import './components/clients.client';
import './components/project-dialog.client';
import './components/projects.client';
import './components/skills.client';
import './components/theme-selector.client';

activateScrollAnimations();

applyInit(document.body);

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
