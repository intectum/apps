import { Client, Project, Tag } from './types';

const cache = new Map<string, unknown>();

export const getClients = () => get<Client>('/data/clients.json');

export const getProjects = async (tags?: Tag[], query?: string) =>
{
  const projects = await get<Project>('/data/projects.json');

  const allClients = await getClients();
  const allTags = await getTags();

  for (const project of projects)
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clientSlug = (project as any).clientSlug as string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tagSlugs = (project as any).tagSlugs as string[];

    project.client = allClients.find(client => client.slug === clientSlug);
    project.tags = allTags.filter(tag => tagSlugs.includes(tag.slug));
  }

  return projects.filter(project =>
  {
    if (tags?.length)
    {
      if (!tags.some(tag => project.tags.some(projectTag => projectTag.slug === tag.slug)))
      {
        return false;
      }
    }

    if (query)
    {
      const projectIncludes =
        project.name.toLowerCase().includes(query) ||
        project.description.some(paragraph => paragraph.toLowerCase().includes(query)) ||
        (project.endClient && project.endClient.toLowerCase().includes(query)) ||
        project.tags.some(tag => tag.name.toLowerCase().includes(query));

      if (project.client)
      {
        const clientIncludes =
          !project.client ||
          project.client.name.toLowerCase().includes(query) ||
          project.client.description.some(paragraph => paragraph.toLowerCase().includes(query)) ||
          (project.client.reference && project.client.reference.toLowerCase().includes(query)) ||
          project.client.position.toLowerCase().includes(query);

        if (!projectIncludes && !clientIncludes)
        {
          return false;
        }
      }
      else
      {
        if (!projectIncludes)
        {
          return false;
        }
      }
    }

    return true;
  });
};

export const getTags = () => get<Tag>('/data/tags.json');

export const get = async <T>(path: string) =>
{
  if (!cache.has(path))
  {
    const response = await fetch(path);
    cache.set(path, await response.json());
  }

  return cache.get(path) as T[];
};
