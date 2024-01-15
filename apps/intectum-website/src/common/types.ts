export const cvUrl = 'https://docs.google.com/document/d/15zjwNuKiEQEht9gHmLw94-1vkTog9jSKBGfKJvu7vJc/edit?usp=drive_link';

export interface Client {
  slug: string;
  name: string;
  active: boolean;
  description: string[];
  link: string;
  reference: string;
  position: string;
  employmentType: EmploymentType;
  dates: DateRange[];
  iconUrl: string;
}

export interface DateRange {
  startedAt: string;
  endedAt: string;
  offAndOn?: boolean;
  yearOnly?: boolean;
}

export type EmploymentType = 'contractor' | 'employee';

export interface Project {
  name: string;
  description: string[];
  links: { [key: string]: string };
  client?: Client;
  endClient: string;
  tags: Tag[];
  dates: DateRange;
  mediaUrl: string;
}

export interface Tag {
  slug: string;
  name: string;
  active: boolean;
  type: TagType;
  iconUrl: string;
}

export type TagType = 'experience' | 'tool';
