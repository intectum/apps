import { addNavigation, defineBasisAnchor, defineBasisDialog, enableLiveReload } from 'apps-web/client';

import { activateScrollAnimations } from './common/scroll-animations';
import { defineCarousel } from './components/carousel';
import { defineHomeBoids } from './components/home/boids';
import { defineHomeClients } from './components/home/clients';
import { defineHomeProjects } from './components/home/projects';
import { defineHomeSkills } from './components/home/skills';
import { defineProjectDialog } from './components/project-dialog';
import { defineProjectsPage } from './components/projects/page';
import { defineThemeSelector } from './components/theme-selector';

addNavigation();
defineBasisAnchor();
defineBasisDialog();

defineCarousel();
defineHomeBoids();
defineHomeClients();
defineHomeProjects();
defineHomeSkills();
defineProjectDialog();
defineProjectsPage();
defineThemeSelector();

activateScrollAnimations();

if (process.env.NODE_ENV !== 'production')
{
  enableLiveReload();
}
