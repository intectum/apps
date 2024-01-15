import * as _firestore from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

import { deleteDocument, getDocument, getDocuments, updateDocument } from 'apps-firebase';
import { Invitation, User, UserPrivate } from 'madfam-core';

import { isDev } from './firebase/params';

export const deleteAccount = onCall({ enforceAppCheck: !isDev() }, async request =>
{
  if (!request.auth)
  {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const batch = admin.firestore().batch();

  const currentUserPrivate = await getDocument<UserPrivate>(`users/${request.auth.uid}/userPrivates`, 'private');
  if (!currentUserPrivate)
  {
    return;
  }

  await deleteDocument('users', request.auth.uid, batch);
  await deleteDocument(`users/${request.auth.uid}/userPrivates`, 'private');

  const friends = await getDocuments<User>('users', currentUserPrivate.friendIds);
  for (const friend of friends)
  {
    const friendUserPrivate = await getDocument<UserPrivate>(`users/${friend.id}/userPrivates`, 'private');
    if (!friendUserPrivate)
    {
      return;
    }

    await updateDocument<UserPrivate>(
      `users/${friend.id}/userPrivates`,
      'private',
      { friendIds: friendUserPrivate.friendIds.filter(friendId => friendId !== request.auth?.uid) },
      batch
    );
  }

  const invitationFilter = _firestore.Filter.or(
    _firestore.Filter.where('senderId', '==', request.auth.uid),
    _firestore.Filter.where('recipientId', '==', request.auth.uid)
  );
  const invitations = await getDocuments<Invitation>('invitations', invitationFilter);
  for (const invitation of invitations)
  {
    await deleteDocument('invitations', invitation.id, batch);
  }

  await batch.commit();

  await admin.auth().deleteUser(request.auth.uid);
});
