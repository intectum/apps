import { addMonths, beforeDate, diffDays, WithoutId } from 'apps-core';

import { populateAddress } from './addresses';
import { HeatMap, User } from './types';

export const createMonthlyHeatMap = async (users: User[], year: number, month: number) =>
{
  const heatMap: WithoutId<HeatMap> =
  {
    date: { year, month, day: 1 },
    points: []
  };

  const end = addMonths(heatMap.date, 1);
  const length = diffDays(end, heatMap.date);

  let maxWeight = 0;

  for (const user of users)
  {
    for (let stopIndex = 0; stopIndex < user.timeline.length; stopIndex++)
    {
      const stop = user.timeline[stopIndex];
      const arrivedAt = stop.arrivedAt;
      const nextStop = user.timeline[stopIndex + 1];
      const nextArrivedAt = nextStop?.arrivedAt ?? addMonths(arrivedAt, 12);

      if (!beforeDate(arrivedAt, end) || beforeDate(nextArrivedAt, heatMap.date))
      {
        continue;
      }

      if (!stop.address.location)
      {
        await populateAddress(stop.address);
      }

      const location = stop.address.location;
      if (!location)
      {
        continue;
      }

      let point = heatMap.points.find(monthPoint => monthPoint.latitude === location.latitude && monthPoint.longitude === location.longitude);
      if (!point)
      {
        point = { ...location, weight: 0 };
        heatMap.points.push(point);
      }

      const daysFromStart = Math.max(0, diffDays(arrivedAt, heatMap.date));
      const daysUntilEnd = Math.max(0, diffDays(end, nextArrivedAt) - 1);

      point.weight += length - daysFromStart - daysUntilEnd;
      if (point.weight > maxWeight)
      {
        maxWeight = point.weight;
      }
    }
  }

  // Normalize
  for (const point of heatMap.points)
  {
    point.weight /= maxWeight;
  }

  return heatMap;
};
