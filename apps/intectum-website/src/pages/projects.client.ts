import { mapToHTML } from 'based';
import { init, toElement } from 'based/client';

import allClients from '../data/clients';
import allProjects from '../data/projects';
import allSkills from '../data/skills';
import renderProjectHTML from '../components/project.template';
import renderProjectDialogHTML from '../components/project-dialog.template';

const queryDelay = 2 * 1000; // 2 seconds

init['[data-name="page-projects"]'] = element =>
{
  let queryTimeout = 0;

  updateProjects(element);

  const form = element.querySelector<HTMLFormElement>('form');
  if (form)
  {
    form.onsubmit = event =>
    {
      event.preventDefault();

      clearTimeout(queryTimeout);
      updateProjects(element);
    };
  }

  const search = element.querySelector<HTMLInputElement>('[name="search"]');
  if (search)
  {
    search.oninput = () =>
    {
      clearTimeout(queryTimeout);
      queryTimeout = window.setTimeout(() => updateProjects(element), queryDelay);
    };
  }
};

const updateProjects = (element: HTMLElement) =>
{
  const search = element.querySelector<HTMLInputElement>('[name="search"]');
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

  const projectGrid = element.querySelector<HTMLDivElement>('[data-name="project-grid"]');
  if (!projectGrid) return;

  const projects = getProjects(searchParams.get('client') ?? undefined, searchParams.get('q') ?? undefined);
  projectGrid.innerHTML = mapToHTML(projects, renderProjectHTML);

  const openProjectAll = element.querySelectorAll<HTMLButtonElement>('[data-name="project"]');
  for (const openProject of openProjectAll)
  {
    openProject.onclick = () =>
    {
      const projectSlug = openProject.dataset.projectSlug;
      const project = allProjects.find(theProject => theProject.slug === projectSlug);
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

const getProjects = (clientSlug?: string, query?: string) =>
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
};
