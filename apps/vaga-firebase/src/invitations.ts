import * as admin from 'firebase-admin';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';

import { getDocument, fromDocument, deleteDocument, updateDocument } from 'apps-firebase';
import { Invitation, User, UserPrivate } from '../../../packages/vaga-core';

import { notifyUser } from './firebase/messaging';
import { isDev } from './firebase/params';

const expiresAfterSeconds = 60 * 60 * 24 * 7; // 1 week

export const notifyRecipient = onDocumentCreated('invitations/{invitationId}', async event =>
{
  if (!event.data)
  {
    return;
  }

  const invitation = await fromDocument<Invitation>(event.data);
  if (!invitation?.recipientId)
  {
    return;
  }

  const sender = await getDocument<User>('users', invitation.senderId);
  if (!sender)
  {
    return;
  }

  await notifyUser(
    invitation.recipientId,
    'Friend request',
    `${sender.displayName} has requested to be your friend`,
    { invitationId: invitation.id, senderId: sender.id }
  );
});

export const acceptInvitation = onCall<{ id?: string }>({ enforceAppCheck: !isDev() }, async request =>
{
  if (!request.auth)
  {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  if (!request.data.id)
  {
    throw new HttpsError('invalid-argument', 'id is required.');
  }

  const invitation = await getDocument<Invitation>('invitations', request.data.id);
  if (!invitation || (invitation.recipientId && invitation.recipientId !== request.auth.uid))
  {
    throw new HttpsError('invalid-argument', 'Invalid invitation.');
  }

  const currentUser = await getDocument<User>('users', request.auth.uid);
  const sender = await getDocument<User>('users', invitation.senderId);
  const currentUserPrivate = await getDocument<UserPrivate>(`users/${request.auth.uid}/userPrivates`, 'private');
  const senderPrivate = await getDocument<UserPrivate>(`users/${invitation.senderId}/userPrivates`, 'private');
  if (!currentUser || !sender || !currentUserPrivate || !senderPrivate)
  {
    throw new HttpsError('invalid-argument', 'Invalid invitation.');
  }

  const batch = admin.firestore().batch();
  await updateDocument<UserPrivate>(`users/${currentUser.id}/userPrivates`, 'private', { friendIds: [ ...currentUserPrivate.friendIds, sender.id ] }, batch);
  await updateDocument<UserPrivate>(`users/${sender.id}/userPrivates`, 'private', { friendIds: [ ...senderPrivate.friendIds, currentUser.id ] }, batch);
  if (invitation.recipientId)
  {
    await deleteDocument('invitations', invitation.id, batch);
  }
  await batch.commit();

  await notifyUser(
    currentUser.id,
    'Friend added',
    `You are now friends with ${sender.displayName}`,
    { userId: sender.id }
  );

  await notifyUser(
    sender.id,
    'Friend added',
    `You are now friends with ${currentUser.displayName}`,
    { userId: currentUser.id }
  );

  return sender;
});

export const deleteExpiredInvitations = onSchedule('every day 00:00', async () =>
{
  const nowSeconds = Date.now() / 1000;

  const invitationsSnapshot = await admin.firestore()
    .collection('invitations')
    .get();

  for (const invitationSnapshot of invitationsSnapshot.docs)
  {
    const invitation = await fromDocument<Invitation>(invitationSnapshot);
    if (invitation?.recipientId)
    {
      continue;
    }

    // TODO add create and update times to objects mapped from docs?
    if (nowSeconds > invitationSnapshot.createTime.seconds + expiresAfterSeconds)
    {
      await invitationSnapshot.ref.delete();
    }
  }
});
