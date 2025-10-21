import { toElement } from 'apps-web';

import projects from '../../data/projects';
import renderProjectDialogHTML from '../../templates/project-dialog';

export class Projects extends HTMLDivElement
{
  connectedCallback()
  {
    const openProjectAll = this.querySelectorAll<HTMLButtonElement>('[data-action="open-project"]');
    for (const openProject of openProjectAll)
    {
      openProject.onclick = () =>
      {
        const projectSlug = openProject.dataset.projectSlug;
        const project = projects.find(theProject => theProject.slug === projectSlug);
        if (project)
        {
          const dialog = toElement<HTMLDialogElement>(renderProjectDialogHTML(project));
          this.appendChild(dialog);

          dialog.onclose = () => dialog.remove();
          dialog.showModal();
        }
      };
    }
  }
}

export const defineHomeProjects = () =>
  customElements.define('intectum-home-projects', Projects, { extends: 'div' });
