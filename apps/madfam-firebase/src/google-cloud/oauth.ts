import { defineString } from 'firebase-functions/params';
import { Credentials } from 'google-auth-library';
import { google } from 'googleapis';

import { updateDocument } from 'apps-firebase';
import { User, UserPrivate } from 'madfam-core';

const clientId = defineString('GOOGLE_CLIENT_ID').value();
const clientSecret = defineString('GOOGLE_CLIENT_SECRET').value();

export const getOAuthClientForRedirect = async (redirectUrl: string) =>
  new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

export const getOAuthClientForUser = async (user: User, userPrivate: UserPrivate) =>
{
  const client = new google.auth.OAuth2(clientId, clientSecret);
  client.on('tokens', async tokens => saveTokens(user.id, tokens));
  client.setCredentials({ access_token: userPrivate.google?.accessToken, refresh_token: userPrivate.google?.refreshToken });

  return client;
};

export const saveTokens = async (userId: string, credentials: Credentials) =>
  await updateDocument<{ id: string; 'google.accessToken': string; 'google.refreshToken': string; }>(
    `users/${userId}/userPrivates`,
    'private',
    {
      'google.accessToken': credentials.access_token ?? undefined,
      'google.refreshToken': credentials.refresh_token ?? undefined
    }
  );
