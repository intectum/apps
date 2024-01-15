import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';

import { addMonths, firstOfMonth, today } from 'apps-core';
import { deleteDocument, getDocuments, setDocument } from 'apps-firebase';
import { createMonthlyHeatMap, HeatMap, User } from 'madfam-core';

const monthCount = 12;

export const createHeatMaps = onSchedule('every day 00:00', async () =>
{
  const batch = admin.firestore().batch();

  const existingHeatMaps = await getDocuments<HeatMap>('heatMaps');
  for (const heatMap of existingHeatMaps)
  {
    await deleteDocument('heatMaps', heatMap.id, batch);
  }

  const users = await getDocuments<User>('users');

  const thisMonthStart = firstOfMonth(today());
  const monthStarts = Array.from({ length: monthCount }).map((_, theIndex) => addMonths(thisMonthStart, theIndex));

  for (const monthStart of monthStarts)
  {
    await setDocument<HeatMap>('heatMaps', await createMonthlyHeatMap(users, monthStart.year, monthStart.month), batch);
  }

  await batch.commit();
});
