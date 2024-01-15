import * as _firestore from '@google-cloud/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { v4 as uuid } from 'uuid';

import { afterDate, DateOnly } from 'apps-core';
import { getDocument, updateDocument } from 'apps-firebase';
import {
  addStop,
  fromAddressKey,
  LatLng,
  reverseGeocode,
  sameAddress,
  Stop,
  toAddressKey,
  User,
  UserPrivate
} from 'madfam-core';

import { isDev } from './firebase/params';

export const updateLocation = onCall<{ location?: LatLng, updatedAt?: DateOnly }>({ enforceAppCheck: !isDev() }, async request =>
{
  if (!request.auth)
  {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  if (!request.data.location)
  {
    throw new HttpsError('invalid-argument', 'location is required.');
  }

  if (!request.data.updatedAt)
  {
    throw new HttpsError('invalid-argument', 'updatedAt is required.');
  }

  const currentUser = await getDocument<User>('users', request.auth.uid);
  const currentUserPrivate = await getDocument<UserPrivate>(`users/${request.auth.uid}/userPrivates`, 'private');
  if (!currentUser || !currentUserPrivate)
  {
    return;
  }

  const addresses = await reverseGeocode(request.data.location);
  if (!addresses.length)
  {
    return;
  }

  // No need to confirm the first stop, add it now and exit
  if (!currentUser.timeline.length)
  {
    const stop: Stop =
    {
      address: addresses[0],
      arrivedAt: request.data.updatedAt,
      confidence: 1,
      sources: [ { id: uuid(), type: 'location' } ]
    };

    addStop(currentUser.timeline, stop);
    await updateDocument<User>('users', request.auth.uid, { timeline: currentUser.timeline });

    return;
  }

  const confirmedAddress = addresses.find(address =>
    currentUserPrivate.location?.addressKeys.some(addressKey => sameAddress(fromAddressKey(addressKey), address)));
  if (!confirmedAddress)
  {
    await updateDocument<UserPrivate>(
      `users/${request.auth.uid}/userPrivates`,
      'private',
      {
        location:
        {
          addressKeys: addresses.map(toAddressKey),
          updatedAt: request.data.updatedAt
        }
      }
    );

    return;
  }

  // No days have passed since the location was recorded, exit
  if (!currentUserPrivate.location || !afterDate(currentUserPrivate.location.updatedAt, request.data.updatedAt))
  {
    return;
  }

  const stop: Stop =
  {
    address: confirmedAddress,
    arrivedAt: currentUserPrivate.location.updatedAt, // Back-date to when location was recorded
    confidence: 1,
    sources: [ { id: uuid(), type: 'location' } ]
  };

  addStop(currentUser.timeline, stop);
  await updateDocument<User>('users', request.auth.uid, { timeline: currentUser.timeline });

  // Only clear the recorded location after a successful update
  await updateDocument<UserPrivate>(
    `users/${request.auth.uid}/userPrivates`,
    'private',
    // TODO why can't I reference this from firebase-admin?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { location: _firestore.FieldValue.delete() as any }
  );
});
