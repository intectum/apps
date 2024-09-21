import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Victor from 'victor';

export const cvUrl = 'https://docs.google.com/document/d/15zjwNuKiEQEht9gHmLw94-1vkTog9jSKBGfKJvu7vJc';

export type Boid =
{
  position: Victor;
  velocity: Victor;
  sprinting: boolean;
  sprintDuration: number;
  sprintCompletedTime: number;
};

export type Client =
{
  slug: string;
  name: string;
  active: boolean;
  description?: string;
  link: Link;
  reference: string;
  position: string;
  employmentType: EmploymentType;
  dates: DateRange[];
  iconUrl: string;
};

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
  icon?: IconProp;
  title?: string;
};

export type Project =
{
  name: string;
  description?: string;
  links: Link[];
  client?: Client;
  endClient: string;
  skills: Skill[];
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
