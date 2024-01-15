import { Moment } from 'moment';

export interface CalendarEvent
{
  id: string;
  summary: string;
  description: string;
  location: string;
  start: Moment;
  end: Moment;
}
