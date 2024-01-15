import { DateTime } from 'luxon';

import { DateOnly } from './types';

export const today = (): DateOnly => fromDateTime(DateTime.local());

export const fromDateTime = (dateTime: DateTime) =>
{
  const dateTimeObject = dateTime.toObject() as DateOnly;

  return {
    year: dateTimeObject.year,
    month: dateTimeObject.month,
    day: dateTimeObject.day
  };
};

export const fromIsoString = (iso: string) => fromDateTime(DateTime.fromISO(iso));

export const toDateTime = (date: DateOnly) => DateTime.fromObject(date);

export const toIsoString = (date: DateOnly) => toDateTime(date).toISODate() as string;

export const formatDate = (date: DateOnly) => toDateTime(date).toLocaleString(DateTime.DATE_MED);

export const formatDateRange = (dates: DateOnly[]) =>
{
  if (dates.length === 0)
  {
    return undefined;
  }

  if (dates.length === 1)
  {
    return formatDate(dates[0]);
  }

  return `${formatDate(dates[0])} - ${formatDate(dates[1])}`;
};

export const firstOfMonth = (date: DateOnly): DateOnly => ({ year: date.year, month: date.month, day: 1 });

export const addMonths = (date: DateOnly, count: number): DateOnly => fromDateTime(toDateTime(date).plus({ months: count }));

export const beforeDate = (test: DateOnly, anchor: DateOnly) => toDateTime(test) < toDateTime(anchor);

export const sameDate = (a: DateOnly, b: DateOnly) => toDateTime(a).equals(toDateTime(b));

export const afterDate = (test: DateOnly, anchor: DateOnly) => toDateTime(test) > toDateTime(anchor);

export const betweenDates = (test: DateOnly, a: DateOnly, b: DateOnly, inclusive?: boolean) =>
{
  const testDateTime = toDateTime(test);
  const aDateTime = toDateTime(a);
  const bDateTime = toDateTime(b);

  if (inclusive)
  {
    return testDateTime >= aDateTime && testDateTime <= bDateTime;
  }

  return testDateTime > aDateTime && testDateTime < bDateTime;
};

export const diffDays = (a: DateOnly, b: DateOnly) => toDateTime(a).diff(toDateTime(b), 'days').toObject().days as number;

export const diffMonths = (a: DateOnly, b: DateOnly) => toDateTime(a).diff(toDateTime(b), 'months').toObject().months as number;
