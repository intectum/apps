import * as admin from 'firebase-admin';
import { projectID } from 'firebase-functions/params';
import { onCall, onRequest } from 'firebase-functions/v2/https';

import { getDocument } from 'apps-firebase';
import { User, UserPrivate } from '../../../../packages/vaga-core';

import { isDev } from '../firebase/params';
import { watchGoogleCalendar } from './calendar';
import { getOAuthClientForRedirect, saveTokens } from './oauth';

const redirectUrl = `https://us-central1-${projectID.value()}.cloudfunctions.net/authorizeWithGoogleCallback`;

export const authorizeWithGoogle = onCall<{ idToken?: string }>({ enforceAppCheck: !isDev() }, async request =>
{
  const client = await getOAuthClientForRedirect(redirectUrl);
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
    include_granted_scopes: true,
    state: request.data.idToken
  });
});

export const authorizeWithGoogleCallback = onRequest(async (request, response) =>
{
  let idToken;
  try
  {
    idToken = await admin.auth().verifyIdToken(request.query.state as string);
  }
  catch (err)
  {
    console.error(err);

    response.writeHead(401);
    response.end();
    return;
  }

  const client = await getOAuthClientForRedirect(redirectUrl);
  const { tokens } = await client.getToken(request.query.code as string);
  await saveTokens(idToken.uid, tokens);

  const user = await getDocument<User>('users', idToken.uid);
  const userPrivate = await getDocument<UserPrivate>(`users/${idToken.uid}/userPrivates`, 'private');
  if (user && userPrivate)
  {
    await watchGoogleCalendar(user, userPrivate);
  }

  response.writeHead(301, { Location: 'vaga://google-authorized' });
  response.end();
});
