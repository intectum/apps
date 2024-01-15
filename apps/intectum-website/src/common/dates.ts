import { DateTime } from 'luxon';

export const formatMonthYear = (monthYear: string) =>
  DateTime.fromISO(monthYear).toLocaleString({ month: 'short', year: 'numeric' });
