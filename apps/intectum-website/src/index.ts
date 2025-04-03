import { addNavigation, defineBasisAnchor, defineBasisDialog, enableLiveReload } from 'apps-web/client';

import { activateScrollAnimations } from './common/scroll-animations';
import { defineCarousel } from './components/carousel';
import { defineHomeBoids } from './components/index/boids';
import { defineHomeClients } from './components/index/clients';
import { defineHomeLanguages } from './components/index/languages';
import { defineHomeProjects } from './components/index/projects';
import { defineHomeSkills } from './components/index/skills';
import { defineProjectDialog } from './components/project-dialog';
import { defineProjectsPage } from './components/projects/page';
import { defineThemeSelector } from './components/theme-selector';

addNavigation();
defineBasisAnchor();
defineBasisDialog();

defineCarousel();
defineHomeBoids();
defineHomeClients();
defineHomeLanguages();
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
