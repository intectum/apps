export const cvUrl = 'https://docs.google.com/document/d/15zjwNuKiEQEht9gHmLw94-1vkTog9jSKBGfKJvu7vJc';

export type Boid =
{
  position: Vec2;
  velocity: Vec2;
  sprinting: boolean;
  sprintDuration: number;
  sprintCompletedTime: number;
};

export type Client = ClientActive | ClientInactive;

type ClientBase =
{
  slug: string;
  name: string;
  description?: string;
  link: Link;
  reference?: string;
  position: string;
  employmentType: EmploymentType;
  dates: DateRange[];
};

type ClientActive = ClientBase & { active: true; iconUrl: string; };
type ClientInactive = ClientBase & { active: false; iconUrl?: string; };

export type DateRange =
{
  startedAt: string;
  endedAt: string;
  offAndOn?: boolean;
  yearOnly?: boolean;
};

export type EmploymentType = 'contractor' | 'employee';

export type Link =
{
  url: string;
  icon?: string;
  title?: string;
};

export type Project =
{
  slug: string;
  name: string;
  description?: string;
  links: Link[];
  clientSlug?: string;
  endClient?: string;
  skillSlugs: string[];
  dates: DateRange;
  imageUrl: string;
};

export type Skill =
{
  slug: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
};

export type SkillCategory = 'back' | 'front' | 'lang' | 'other';

export type Vec2 = {
  x: number;
  y: number;
}
