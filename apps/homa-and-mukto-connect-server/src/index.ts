import * as http from 'node:http';

import * as dotenv from 'dotenv';
import { Pool, types } from 'pg';

import { Registration, User } from 'homa-and-mukto-connect-core';

dotenv.config();

import { getAll as getAllAddresses } from './addresses';
import { Context } from './common/types';
import { authenticate, token } from './common/oauth';
import { getFormBody, getJsonBody, respondWithCode, respondWithJson } from './common/util';
import { create as createRegistration, verify as verifyRegistration } from './registrations';
import { getAll as getAllUsers, remove as removeUser, update as updateUser } from './users';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
types.setTypeParser(types.builtins.NUMERIC, (value: any) => parseFloat(value));
const pool = new Pool();

http.createServer(async (req, res) =>
{
  if (req.method === 'OPTIONS')
  {
    respondWithCode(res, 200);
    return;
  }

  const url = new URL(req.url ?? '', 'https://dummy');

  const context: Context = { client: await pool.connect() };
  await context.client.query('BEGIN');

  try
  {
    if (url.pathname === '/oauth/token')
    {
      if (req.method === 'POST')
      {
        try
        {
          respondWithJson(res, 201, await token(context, req));
          return;
        }
        catch
        {
          respondWithCode(res, 400);
          return;
        }
      }
    }
    else if (url.pathname === '/registrations')
    {
      if (req.method === 'POST')
      {
        await createRegistration(context, await getFormBody<Registration>(req));
        respondWithCode(res, 201);
        return;
      }
      else if (req.method === 'PUT')
      {
        await verifyRegistration(context, await getJsonBody<string>(req));
        respondWithCode(res, 200);
        return;
      }
    }

    try
    {
      const token = await authenticate(context, req);
      context.user = token.user as User;
    }
    catch
    {
      respondWithCode(res, 401);
      return;
    }

    if (url.pathname === '/addresses')
    {
      if (req.method === 'GET')
      {
        respondWithJson(res, 200, await getAllAddresses(context));
        return;
      }
    }
    else if (url.pathname === '/users')
    {
      if (req.method === 'GET')
      {
        respondWithJson(res, 200, await getAllUsers(context, url.searchParams));
        return;
      }
    }
    else if (url.pathname.startsWith('/users/'))
    {
      const id = url.pathname.substring('/users/'.length);
      if (id !== context.user?.id)
      {
        respondWithCode(res, 403);
        return;
      }

      if (req.method === 'DELETE')
      {
        await removeUser(context, id);
        respondWithCode(res, 200);
        return;
      }
      else if (req.method === 'PUT')
      {
        const user = await getFormBody<User>(req);
        user.id = id;
        respondWithJson(res, 200, await updateUser(context, user));
        return;
      }
    }

    respondWithCode(res, 404);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any)
  {
    await context.client.query('ROLLBACK');
    console.error(err);
    respondWithCode(res, 500);
  }
  finally
  {
    await context.client.query('COMMIT');
    context.client.release();
  }
})
  .listen(8000);

console.log('server running at http://localhost:8000/');
