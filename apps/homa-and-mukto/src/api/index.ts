import fs from 'node:fs';

import { Pool, types } from 'pg';

import { RequestListener, respond, toUrl } from 'based/server';

import { Context, FullUser, Registration, User } from '../types';
import * as addresses from './addresses';
import * as passwordResets from './password-reset';
import * as registrations from './registrations';
import * as users from './users';
import { decryptKey } from './util/crypto';
import { authenticate, token } from './util/oauth';
import { getBody } from './util/requests';
import { respondWithJson } from './util/responses';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
types.setTypeParser(types.builtins.NUMERIC, (value: any) => parseFloat(value));
const pool = new Pool();

const uuidRexeg = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

if (!fs.existsSync('user-images')) fs.mkdirSync('user-images');

export const apiRequestListener: RequestListener = async (req, res, secure) =>
{
  if (req.method === 'OPTIONS')
  {
    respond(res, 200);
    return true;
  }

  const url = toUrl(req, secure);

  const context: Context = { baseUrl: `${url.protocol}//${url.host}`, client: await pool.connect() };
  await context.client.query('BEGIN');

  try
  {
    if (url.pathname === '/api/oauth/token')
    {
      if (req.method === 'POST')
      {
        try
        {
          respondWithJson(res, 201, await token(context, req));
          return true;
        }
        catch
        {
          respond(res, 400);
          return true;
        }
      }
    }
    else if (url.pathname === '/api/password-reset')
    {
      if (req.method === 'POST')
      {
        const { email } = await getBody<{ email: string }>(req);
        await passwordResets.create(context, email);
        respond(res, 201);
        return true;
      }
    }
    else if (url.pathname === '/api/registrations')
    {
      if (req.method === 'POST')
      {
        await registrations.create(context, await getBody<Registration>(req));
        respond(res, 201);
        return true;
      }
      else if (req.method === 'PUT')
      {
        await registrations.verify(context, await getBody<string>(req));
        respond(res, 200);
        return true;
      }
    }

    const key = url.searchParams.get('key');
    if (key)
    {
      context.user = await users.get(context, decryptKey(key));
      if (!context.user)
      {
        respond(res, 401);
        return true;
      }
    }
    else
    {
      try
      {
        const token = await authenticate(context, req);
        context.user = token.user as FullUser;
      }
      catch
      {
        respond(res, 401);
        return true;
      }
    }

    if (url.pathname === '/api/addresses')
    {
      if (req.method === 'GET')
      {
        respondWithJson(res, 200, await addresses.getAll(context));
        return true;
      }
    }
    else if (url.pathname === '/api/password-reset')
    {
      if (req.method === 'PUT')
      {
        const { password } = await getBody<{ password: string }>(req);
        await passwordResets.update(context, password);
        respond(res, 200);
        return true;
      }
    }
    else if (url.pathname === '/api/users')
    {
      if (req.method === 'GET')
      {
        respondWithJson(res, 200, await users.getAll(context, url.searchParams));
        return true;
      }
    }

    const userMatch = url.pathname.match(`^/api/users/(${uuidRexeg})$`);
    if (userMatch)
    {
      const id = userMatch[1];
      if (!context.user?.admin && id !== context.user?.id)
      {
        respond(res, 403);
        return true;
      }

      if (req.method === 'DELETE')
      {
        await users.remove(context, id);
        respond(res, 200);
        return true;
      }
      else if (req.method === 'GET')
      {
        respondWithJson(res, 200, await users.get(context, id));
        return true;
      }
      else if (req.method === 'PUT')
      {
        const user = await getBody<User>(req);
        user.id = id;
        respondWithJson(res, 200, await users.update(context, user));
        return true;
      }
    }

    const userAcceptMatch = url.pathname.match(`^/api/users/(${uuidRexeg})/accept`);
    if (userAcceptMatch)
    {
      const id = userAcceptMatch[1];
      if (!context.user?.admin)
      {
        respond(res, 403);
        return true;
      }

      if (req.method === 'POST')
      {
        respondWithJson(res, 200, await users.accept(context, id));
        return true;
      }
    }

    const userDenyMatch = url.pathname.match(`^/api/users/(${uuidRexeg})/deny`);
    if (userDenyMatch)
    {
      const id = userDenyMatch[1];
      if (!context.user?.admin)
      {
        respond(res, 403);
        return true;
      }

      if (req.method === 'POST')
      {
        await users.deny(context, id);
        respond(res, 200);
        return true;
      }
    }

    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any)
  {
    await context.client.query('ROLLBACK');
    console.error(err);
    respond(res, 500);
    return true;
  }
  finally
  {
    await context.client.query('COMMIT');
    context.client.release();
  }
};
