import { init, toElement } from 'based/client';

import projects from '../data/projects';
import renderProjectDialogHTML from './project-dialog.template';

init['[data-name="projects"]'] = element =>
{
  const openProjectAll = element.querySelectorAll<HTMLButtonElement>('[data-name="project"]');
  for (const openProject of openProjectAll)
  {
    openProject.onclick = () =>
    {
      const projectSlug = openProject.dataset.projectSlug;
      const project = projects.find(theProject => theProject.slug === projectSlug);
      if (project)
      {
        const dialog = toElement<HTMLDialogElement>(renderProjectDialogHTML(project));
        element.appendChild(dialog);

        dialog.onclose = () => dialog.remove();
        dialog.showModal();
      }
    };
  }
};
