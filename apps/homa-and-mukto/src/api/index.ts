import { Pool, types } from 'pg';

import { RequestListener, respond, toUrl } from 'apps-web/tools';

import { Context, FullUser, Registration, User } from '../common/types';
import * as addresses from './addresses';
import * as passwordResets from './password-reset';
import * as registrations from './registrations';
import * as users from './users';
import { authenticate, token } from './util/oauth';
import { getBody } from './util/requests';
import { respondWithJson } from './util/responses';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
types.setTypeParser(types.builtins.NUMERIC, (value: any) => parseFloat(value));
const pool = new Pool();

const uuidRexeg = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

export const apiRequestListener: RequestListener = async (req, res, secure) =>
{
  if (req.method === 'OPTIONS')
  {
    respond(res, 200);
    return;
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
          return;
        }
        catch
        {
          respond(res, 400);
          return;
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
        return;
      }
      else if (req.method === 'PUT')
      {
        const { key, password } = await getBody<{ key: string, password: string }>(req);
        await passwordResets.update(context, key, password);
        respond(res, 200);
        return;
      }
    }
    else if (url.pathname === '/api/registrations')
    {
      if (req.method === 'POST')
      {
        await registrations.create(context, await getBody<Registration>(req));
        respond(res, 201);
        return;
      }
      else if (req.method === 'PUT')
      {
        await registrations.verify(context, await getBody<string>(req));
        respond(res, 200);
        return;
      }
    }

    try
    {
      const token = await authenticate(context, req);
      context.user = token.user as FullUser;
    }
    catch
    {
      respond(res, 401);
      return;
    }

    if (url.pathname === '/api/addresses')
    {
      if (req.method === 'GET')
      {
        respondWithJson(res, 200, await addresses.getAll(context));
        return;
      }
    }
    else if (url.pathname === '/api/users')
    {
      if (req.method === 'GET')
      {
        respondWithJson(res, 200, await users.getAll(context, url.searchParams));
        return;
      }
    }
    else if (url.pathname === '/api/users/review')
    {
      if (!context.user?.admin)
      {
        respond(res, 403);
        return;
      }

      if (req.method === 'GET')
      {
        respondWithJson(res, 200, await users.getReview(context));
        return;
      }
    }

    const userMatch = url.pathname.match(`^/api/users/(${uuidRexeg})$`);
    if (userMatch)
    {
      const id = userMatch[1];
      if (!context.user?.admin && id !== context.user?.id)
      {
        respond(res, 403);
        return;
      }

      if (req.method === 'DELETE')
      {
        await users.remove(context, id);
        respond(res, 200);
        return;
      }
      else if (req.method === 'PUT')
      {
        const user = await getBody<User>(req);
        user.id = id;
        respondWithJson(res, 200, await users.update(context, user));
        return;
      }
    }

    const userActivateMatch = url.pathname.match(`^/api/users/(${uuidRexeg})/activate$`);
    if (userActivateMatch)
    {
      const id = userActivateMatch[1];
      if (!context.user?.admin)
      {
        respond(res, 403);
        return;
      }

      if (req.method === 'POST')
      {
        await users.activate(context, id);
        respond(res, 200);
        return;
      }
    }

    respond(res, 404);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any)
  {
    await context.client.query('ROLLBACK');
    console.error(err);
    respond(res, 500);
  }
  finally
  {
    await context.client.query('COMMIT');
    context.client.release();
  }
};
