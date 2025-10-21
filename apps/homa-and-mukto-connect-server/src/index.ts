import * as http from 'node:http';

import * as dotenv from 'dotenv';
import { Pool, types } from 'pg';

import { Credentials, Registration, User } from 'homa-and-mukto-connect-core';

import { getAll as getAllAddresses } from './addresses';
import { Context } from './common/types';
import { getFormBody, getJsonBody, respondWithCode, respondWithJson } from './common/util';
import { create as createRegistration } from './registrations';
import { remove as removeUser, authenticate as authenticateUser, getAll as getAllUsers, update as updateUser } from './users';

dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
types.setTypeParser(types.builtins.NUMERIC, (value: any) => parseFloat(value));
const pool = new Pool();

http.createServer(async (req, res) =>
{
  const url = new URL(req.url ?? '', 'https://dummy');

  const context: Context = { client: await pool.connect() };
  await context.client.query('BEGIN');

  try
  {
    if (req.method === 'OPTIONS')
    {
      respondWithCode(res, 200);
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
    else if (url.pathname === '/registrations')
    {
      if (req.method === 'POST')
      {
        respondWithJson(res, 201, await createRegistration(context, await getFormBody<Registration>(req)));
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
    else if (url.pathname === '/users/authenticate')
    {
      if (req.method === 'POST')
      {
        const user = await authenticateUser(context, await getJsonBody<Credentials>(req));
        if (!user) respondWithCode(res, 401);
        else respondWithJson(res, 200, user);
        return;
      }
    }
    else if (url.pathname.startsWith('/users/'))
    {
      if (req.method === 'DELETE')
      {
        const id = Number(url.pathname.substring('/users/'.length));
        await removeUser(context, id);
        respondWithCode(res, 200);
        return;
      }
      else if (req.method === 'PUT')
      {
        const user = await getFormBody<User>(req);
        user.id = Number(url.pathname.substring('/users/'.length));
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
