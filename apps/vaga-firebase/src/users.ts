import * as _firestore from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { beforeUserCreated } from 'firebase-functions/v2/identity';

import { getDocument, getDocuments, maxInValues, setDocument, fromDocument, updateDocument } from 'apps-firebase';
import { getCurrentStop, Invitation, sameAddress, User, UserPrivate } from '../../../packages/vaga-core';

import { notifyUser } from './firebase/messaging';
import { isDev } from './firebase/params';

export const createUser = beforeUserCreated(async event =>
{
  const user: User = { id: event.data.uid, timeline: [] };

  if (event.data.displayName)
  {
    user.displayName = event.data.displayName;
  }

  if (event.data.phoneNumber)
  {
    user.phoneNumber = event.data.phoneNumber;
  }

  if (event.data.photoURL)
  {
    user.photoUrl = event.data.photoURL;
  }

  await setDocument<User>('users', user);
  await setDocument<UserPrivate>(`users/${event.data.uid}/userPrivates`, { id: 'private', friendIds: [] });
});

// This is a workaround to email/password users not having a displayName during the initial beforeUserCreated and beforeUserSignedIn events
// See: https://stackoverflow.com/questions/48741932/firebase-authfunctions-create-user-with-displayname#comment93672763_48742467
export const setMissingDisplayName = onDocumentCreated('users/{userId}', async event =>
{
  if (!event.data)
  {
    return;
  }

  const user = await fromDocument<User>(event.data);
  if (!user || user.displayName)
  {
    return;
  }

  const setDisplayName = async () =>
  {
    const userRecord = await admin.auth().getUser(user.id);
    if (!userRecord.displayName)
    {
      // Well, we tried...
      return;
    }

    await updateDocument<User>('users', user.id, { displayName: userRecord.displayName });
  };

  // Give plenty of time for sign-up to complete
  setTimeout(setDisplayName, 5000);
});

export const notifyNearbyFriends = onDocumentUpdated('users/{userId}', async event =>
{
  if (!event.data)
  {
    return;
  }

  const userBefore = await fromDocument<User>(event.data.before);
  const userAfter = await fromDocument<User>(event.data.after);
  if (!userBefore || !userAfter)
  {
    return;
  }

  const currentStopBefore = userBefore.timeline && getCurrentStop(userBefore.timeline);
  const currentStopAfter = userAfter.timeline && getCurrentStop(userAfter.timeline);
  if (!currentStopAfter)
  {
    return;
  }

  if (currentStopBefore && sameAddress(currentStopAfter.address, currentStopBefore.address))
  {
    return;
  }

  const userPrivate = await getDocument<UserPrivate>(`users/${userAfter.id}/userPrivates`, 'private');
  if (!userPrivate)
  {
    return;
  }

  const friends = await getDocuments<User>('users', userPrivate.friendIds);

  const localityChanged = currentStopAfter.address.locality !== currentStopBefore?.address.locality;
  const regionChanged = currentStopAfter.address.administrativeAreaLevel1 !== currentStopBefore?.address.administrativeAreaLevel1;
  const countryChanged = currentStopAfter.address.country !== currentStopBefore?.address.country;

  for (const friend of friends)
  {
    const friendCurrentStop = getCurrentStop(friend.timeline);
    if (!friendCurrentStop)
    {
      continue;
    }

    if (localityChanged &&
        sameAddress(friendCurrentStop.address, currentStopAfter.address))
    {
      await notifyUser(
        friend.id,
        'Friend nearby',
        `${userAfter.displayName} just entered the same city as you`,
        { userId: userAfter.id }
      );
      continue;
    }

    if (regionChanged &&
        friendCurrentStop.address.administrativeAreaLevel1 === currentStopAfter.address.administrativeAreaLevel1 &&
        friendCurrentStop.address.country === currentStopAfter.address.country)
    {
      await notifyUser(
        friend.id,
        'Friend nearby',
        `${userAfter.displayName} just entered the same region as you`,
        { userId: userAfter.id }
      );
      continue;
    }

    if (countryChanged &&
        friendCurrentStop.address.country === currentStopAfter.address.country)
    {
      await notifyUser(
        friend.id,
        'Friend nearby',
        `${userAfter.displayName} just entered the same country as you`,
        { userId: userAfter.id }
      );
    }
  }
});

export const findUsersByInvitation = onCall({ enforceAppCheck: !isDev() }, async request =>
{
  if (!request.auth)
  {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const invitations = await getDocuments<Invitation>('invitations', _firestore.Filter.where('recipientId', '==', request.auth.uid));

  const users: User[] = [];
  for (let invitationIndex = 0; invitationIndex < invitations.length; invitationIndex += maxInValues)
  {
    const invitationSlice = invitations.slice(invitationIndex, invitationIndex + maxInValues);

    // TODO why can't I reference this from firebase-admin?
    const userSlice = await getDocuments<User>('users', _firestore.Filter.where(_firestore.FieldPath.documentId(), 'in', invitationSlice.map(invitation => invitation.senderId)));
    for (const user of userSlice)
    {
      if (!users.some(theUser => theUser.id === user.id))
      {
        users.push(user);
      }
    }
  }

  return users;
});

export const findUsersByPhoneNumber = onCall<{ phoneNumbers?: string[] }>({ enforceAppCheck: !isDev() }, async request =>
{
  if (!request.auth)
  {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  if (!request.data.phoneNumbers)
  {
    throw new HttpsError('invalid-argument', 'phoneNumbers is required.');
  }

  const users: User[] = [];
  for (let phoneNumberIndex = 0; phoneNumberIndex < request.data.phoneNumbers.length; phoneNumberIndex += maxInValues)
  {
    const phoneNumberSlice = request.data.phoneNumbers.slice(phoneNumberIndex, phoneNumberIndex + maxInValues);

    // TODO why can't I reference this from firebase-admin?
    const userSlice = await getDocuments<User>('users', _firestore.Filter.where('phoneNumber', 'in', phoneNumberSlice));
    for (const user of userSlice)
    {
      if (!users.some(theUser => theUser.id === user.id))
      {
        users.push(user);
      }
    }
  }

  return users;
});

export const unfriend = onCall<{ userId?: string }>({ enforceAppCheck: !isDev() }, async request =>
{
  if (!request.auth)
  {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  if (!request.data.userId)
  {
    throw new HttpsError('invalid-argument', 'userId is required.');
  }

  const batch = admin.firestore().batch();

  const currentUserPrivate = await getDocument<UserPrivate>(`users/${request.auth.uid}/userPrivates`, 'private');
  const otherUserPrivate = await getDocument<UserPrivate>(`users/${request.data.userId}/userPrivates`, 'private');
  if (!currentUserPrivate || !otherUserPrivate)
  {
    return;
  }

  await updateDocument<UserPrivate>(
    `users/${request.auth.uid}/userPrivates`,
    'private',
    { friendIds: currentUserPrivate.friendIds.filter(friendId => friendId !== request.data.userId) },
    batch
  );

  await updateDocument<UserPrivate>(
    `users/${request.data.userId}/userPrivates`,
    'private',
    { friendIds: otherUserPrivate.friendIds.filter(friendId => friendId !== request.auth?.uid) },
    batch
  );

  await batch.commit();
});
