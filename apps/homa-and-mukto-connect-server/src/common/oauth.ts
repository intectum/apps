import { IncomingMessage } from 'node:http';

import OAuth2Server, { Client, Request, Response } from '@node-oauth/oauth2-server';
import { compare } from 'bcrypt';

import { Token, User } from 'homa-and-mukto-connect-core';

import { get as getUser } from '../users';
import { Context } from './types';
import { getURLSearchParamsBody } from './util';

const theClient: Client =
{
  id: 'homa-and-mukto-connect',
  grants: [ 'password', 'refresh_token' ]
};

export const token = async (context: Context, req: IncomingMessage) =>
  createServer(context).token(await toAuthRequest(req, true), new Response());

export const authenticate = async (context: Context, req: IncomingMessage) =>
  createServer(context).authenticate(await toAuthRequest(req, false), new Response());

const createServer = (context: Context) =>
  new OAuth2Server({
    model:
      {
        getAccessToken: async accessToken =>
        {
          const result = await context.client.query<Token>(
            'SELECT * FROM token WHERE access_token = $1',
            [ accessToken ]
          );

          if (!result.rows.length) return undefined;

          const row = result.rows[0];

          const user = await getUser(context, row.user_id);
          if (!user) return undefined;

          return {
            accessToken,
            accessTokenExpiresAt: new Date(row.access_token_expires_at ?? ''),
            refreshToken: row.refresh_token,
            refreshTokenExpiresAt: new Date(row.refresh_token_expires_at ?? ''),
            client: theClient,
            user: user
          };
        },
        getRefreshToken: async refreshToken =>
        {
          const result = await context.client.query<Token>(
            'SELECT * FROM token WHERE refresh_token = $1',
            [ refreshToken ]
          );

          if (!result.rows.length) return undefined;

          const row = result.rows[0];

          const user = await getUser(context, row.user_id);
          if (!user) return undefined;

          return {
            refreshToken,
            refreshTokenExpiresAt: new Date(row.refresh_token_expires_at ?? ''),
            client: theClient,
            user: user
          };
        },
        getClient: async (clientId, clientSecret /* TODO */) =>
        {
          if (clientId === 'homa-and-mukto-connect') return theClient;

          return undefined;
        },
        getUser: async (username, password) =>
        {
          const result = await context.client.query<{ id: string, password: string }>(
            'SELECT id, password FROM "user" WHERE email = $1 AND status = \'active\'',
            [ username ]
          );

          if (!result.rows.length) return undefined;

          const row = result.rows[0];

          if (!(await compare(password, row.password))) return undefined;

          return getUser(context, row.id);
        },
        saveToken: async (token, client, user) =>
        {
          // TODO delete old tokens

          await context.client.query<User>(
            'INSERT INTO token (access_token, access_token_expires_at, refresh_token, refresh_token_expires_at, user_id) VALUES ($1, $2, $3, $4, $5)',
            [ token.accessToken, token.accessTokenExpiresAt, token.refreshToken, token.refreshTokenExpiresAt, user.id ]
          );

          return { ...token, client, user };
        },
        revokeToken: async token =>
        {
          await context.client.query<User>('DELETE FROM token WHERE refresh_token = $1', [ token.refreshToken ]);

          return true;
        }
      }
  });

const toAuthRequest = async (req: IncomingMessage, getBody: boolean) =>
{
  const body: Record<string, string> = {};
  if (getBody)
  {
    const urlSearchParams = await getURLSearchParamsBody(req);
    urlSearchParams.forEach((value, key) => body[key] = value);
  }

  const headers: Record<string, string> = {};
  for (const key of Object.keys(req.headers))
  {
    if (typeof(req.headers[key]) === 'string')
    {
      headers[key] = req.headers[key];
    }
  }

  return new Request({
    body,
    headers,
    method: req.method ?? '',
    query: {}
  });
};
