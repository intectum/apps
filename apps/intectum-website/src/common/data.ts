import { Client, Project, Skill } from './types';

export const getClients = () => get<Client>(`${process.env.API_BASE_URL ?? ''}/data/clients.json`);

export const getProjects = async (clientSlug?: string, query?: string) =>
{
  const projects = await get<Project>(`${process.env.API_BASE_URL ?? ''}/data/projects.json`);

  const allClients = await getClients();
  const allSkills = await getSkills();

  for (const project of projects)
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clientSlug = (project as any).clientSlug as string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const skillSlugs = (project as any).skillSlugs as string[];

    project.client = allClients.find(client => client.slug === clientSlug);
    project.skills = allSkills.filter(skill => skillSlugs.includes(skill.slug));
  }

  return projects.filter(project =>
  {
    if (clientSlug && project.client?.slug !== clientSlug)
    {
      return false;
    }

    if (query)
    {
      const projectIncludes =
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description?.toLowerCase().includes(query.toLowerCase()) ||
        (project.endClient && project.endClient.toLowerCase().includes(query.toLowerCase())) ||
        project.skills.some(skill => skill.name.toLowerCase().includes(query.toLowerCase()));

      if (project.client)
      {
        const clientIncludes =
          !project.client ||
          project.client.name.toLowerCase().includes(query.toLowerCase()) ||
          project.client.description?.toLowerCase().includes(query.toLowerCase()) ||
          (project.client.reference && project.client.reference.toLowerCase().includes(query.toLowerCase())) ||
          project.client.position.toLowerCase().includes(query.toLowerCase());

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

export const getSkills = () => get<Skill>(`${process.env.API_BASE_URL ?? ''}/data/skills.json`);

export const get = async <T>(path: string) =>
{
  const response = await fetch(path);
  return await response.json() as T[];
};
