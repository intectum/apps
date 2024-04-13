import * as admin from 'firebase-admin';

import { getDocument } from 'apps-firebase';
import { UserPrivate } from '../../../../packages/vaga-core';

export const notifyUser = async (uid: string, title: string, body: string, data?: { [key: string]: string; }) =>
{
  const userPrivate = await getDocument<UserPrivate>(`users/${uid}/userPrivates`, 'private');
  if (!userPrivate?.fcm?.token)
  {
    return;
  }

  await admin.messaging().send(
    {
      notification:
      {
        title,
        body
      },
      data,
      token: userPrivate.fcm.token
    }
  );
};
