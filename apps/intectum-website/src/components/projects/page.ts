import { mapToHTML, toElement } from 'apps-web';

import allClients from '../../data/clients';
import allProjects from '../../data/projects';
import allSkills from '../../data/skills';
import renderProjectHTML from '../../templates/projects/project';
import renderProjectDialogHTML from '../../templates/project-dialog';

const queryDelay = 2 * 1000; // 2 seconds

export class Page extends HTMLDivElement
{
  private queryTimeout = 0;

  connectedCallback()
  {
    this.updateProjects();

    const form = this.querySelector<HTMLFormElement>('form');
    if (form)
    {
      form.onsubmit = event =>
      {
        event.preventDefault();

        clearTimeout(this.queryTimeout);
        this.updateProjects();
      };
    }

    const search = this.querySelector<HTMLInputElement>('[name="search"]');
    if (search)
    {
      search.oninput = () =>
      {
        clearTimeout(this.queryTimeout);
        this.queryTimeout = window.setTimeout(() => this.updateProjects(), queryDelay);
      };
    }

    const openProjectAll = this.querySelectorAll<HTMLButtonElement>('[data-action="open-project"]');
    for (const openProject of openProjectAll)
    {
      openProject.onclick = () =>
      {
        const projectSlug = openProject.getAttribute('data-project-slug');
        const project = allProjects.find(theProject => theProject.slug === projectSlug);
        if (project)
        {
          const dialog = toElement<HTMLDialogElement>(renderProjectDialogHTML(project));
          if (!dialog) return;

          this.appendChild(dialog);

          dialog.onclose = () => dialog.remove();
          dialog.showModal();
        }
      };
    }
  }

  updateProjects()
  {
    const search = this.querySelector<HTMLInputElement>('[name="search"]');
    if (!search) return;

    const searchParams = new URLSearchParams(location.search.substring(1));
    if (search.value)
    {
      searchParams.set('q', search.value);
    }
    else
    {
      searchParams.delete('q');
    }
    history.replaceState({}, '', `/projects${searchParams.toString() ? `?${searchParams}` : ''}`);

    const projectGrid = this.querySelector<HTMLDivElement>('[data-section="project-grid"]');
    if (!projectGrid) return;

    const projects = this.getProjects(searchParams.get('client') ?? undefined, searchParams.get('q') ?? undefined);
    projectGrid.innerHTML = mapToHTML(projects, renderProjectHTML);
  }

  getProjects(clientSlug?: string, query?: string)
  {
    return allProjects.filter(project =>
    {
      if (clientSlug && project.clientSlug !== clientSlug)
      {
        return false;
      }

      if (query)
      {
        const projectIncludes =
          project.name.toLowerCase().includes(query.toLowerCase()) ||
          project.description?.toLowerCase().includes(query.toLowerCase()) ||
          (project.endClient && project.endClient.toLowerCase().includes(query.toLowerCase()));

        const skills = allSkills.filter(skill => project.skillSlugs.includes(skill.slug));
        const skillsIncludes = skills.some(skill => skill.name.toLowerCase().includes(query.toLowerCase()));

        const client = allClients.find(client => client.slug === clientSlug);
        const clientIncludes =
          client?.name.toLowerCase().includes(query.toLowerCase()) ||
          client?.description?.toLowerCase().includes(query.toLowerCase()) ||
          (client?.reference && client.reference.toLowerCase().includes(query.toLowerCase())) ||
          client?.position.toLowerCase().includes(query.toLowerCase());

        return projectIncludes || skillsIncludes || clientIncludes;
      }

      return true;
    });
  }
}

export const defineProjectsPage = () =>
  customElements.define('intectum-projects-page', Page, { extends: 'div' });
