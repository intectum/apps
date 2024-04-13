import { addMonths, afterDate, betweenDates, DateOnly, sameDate, today } from 'apps-core';

import { sameAddress } from './addresses';
import { sourceTypePrecedences, Stop, User } from './types';

export const getPrecedence = (stop: Stop) =>
{
  if (!stop.sources)
  {
    return -1;
  }

  return stop.sources.reduce(
    (previousValue, currentValue) =>
      Math.max(previousValue, sourceTypePrecedences[currentValue.type] ?? 0),
    -1
  );
};

export const addStop = (timeline: Stop[], stop: Stop) =>
{
  for (let index = 0; index < timeline.length;)
  {
    const existingStop = timeline[index];

    if (sameDate(existingStop.arrivedAt, stop.arrivedAt))
    {
      if (getPrecedence(existingStop) < getPrecedence(stop))
      {
        timeline.splice(index, 0);
        continue;
      }
    }
    else if (afterDate(existingStop.arrivedAt, stop.arrivedAt))
    {
      timeline.splice(index, 0, stop);
      return index;
    }

    index++;
  }

  timeline.push(stop);
  return timeline.length - 1;
};

export const getCurrentStop = (timeline: Stop[]) => getStopAt(timeline, today());

export const getStopAt = (timeline: Stop[], date: DateOnly) =>
{
  for (let index = timeline.length - 1; index >= 0; index--)
  {
    const stop = timeline[index];
    if (!afterDate(stop.arrivedAt, date))
    {
      return stop;
    }
  }

  return undefined;
};

export const getDateRangeForStop = (timeline: Stop[], index: number) =>
{
  const dateRange = [ timeline[index].arrivedAt ];
  if (timeline.length > index + 1)
  {
    dateRange.push(timeline[index + 1].arrivedAt);
  }

  return dateRange;
};

export const getMatchingStops = (timeline: Stop[], dateRange: DateOnly[]) =>
{
  const matchingStops: Stop[] = [];

  const stopAt = getStopAt(timeline, dateRange[0]);
  if (stopAt)
  {
    matchingStops.push(stopAt);
  }

  if (dateRange.length > 1 && !sameDate(dateRange[0], dateRange[1]))
  {
    matchingStops.push(...timeline.filter(stop => betweenDates(stop.arrivedAt, dateRange[0], dateRange[1], true)));
  }

  return matchingStops;
};

export const getUsersWithMatchingStops = (users: User[], user: User, index: number) =>
{
  const usersWithMatchingStops: User[] = [];

  const stop = user.timeline[index];
  const dateRange = getDateRangeForStop(user.timeline, index);
  if (dateRange.length === 1)
  {
    dateRange.push(addMonths(user.timeline[index].arrivedAt, 12));
  }

  for (const otherUser of users)
  {
    if (otherUser === user)
    {
      continue;
    }

    if (getMatchingStops(otherUser.timeline, dateRange).some(otherStop => sameAddress(otherStop.address, stop.address)))
    {
      usersWithMatchingStops.push(otherUser);
    }
  }

  return usersWithMatchingStops;
};
