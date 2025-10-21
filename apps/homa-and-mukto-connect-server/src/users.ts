import { Address, New, User } from 'homa-and-mukto-connect-core';

import { update as updateAddress } from './addresses';
import { Context } from './common/types';

export const get = async (context: Context, id: number) =>
{
  const result = await context.client.query<User & Address & { address_id: number }>(
    'SELECT "user".id, "user".name, "user".image, "user".contacts, "user".groups, address.id as address_id, address.latitude, address.longitude, address.meta FROM "user" LEFT JOIN address ON address.user_id = "user".id WHERE "user".id = $1',
    [ id ]
  );

  if (!result.rows.length) return undefined;

  const row = result.rows[0];

  const user: User =
  {
    id: row.id,
    name: row.name,
    image: row.image,
    contacts: row.contacts,
    groups: row.groups,
    created_at: '',
    updated_at: ''
  };

  if (row.address_id)
  {
    user.address =
    {
      id: row.address_id,
      latitude: row.latitude,
      longitude: row.longitude,
      meta: row.meta,
      created_at: '',
      updated_at: '',
      user_id: row.id
    };
  }

  return user;
};

export const getAll = async (context: Context, params: URLSearchParams) =>
{
  let query = 'SELECT id, name, image, contacts, groups FROM "user"';
  const values: any[] = [];

  const ids = params.get('ids')?.split(',');
  if (ids)
  {
    query += ' WHERE id = ANY ($1)';
    values.push(ids);
  }

  const result = await context.client.query<User>(query, values);

  return result.rows;
};

export const create = async (context: Context, user: New<User>, email: string, password: string) =>
{
  // TODO encrypt password
  const result = await context.client.query<User>(
    'INSERT INTO "user" (email, password, name, image, contacts, groups) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [ email, password, user.name, user.image, user.contacts, user.groups ]
  );

  return (await get(context, result.rows[0].id)) as User;
};

export const update = async (context: Context, user: User) =>
{
  await context.client.query<User>(
    'UPDATE "user" SET name = $1, image = $2, contacts = $3, groups = $4 WHERE id = $5',
    [ user.name, user.image, user.contacts, user.groups, user.id ]
  );

  if (user.address) await updateAddress(context, user.address);

  return get(context, user.id);
};

export const remove = async (context: Context, id: number) =>
  context.client.query<User>('DELETE FROM "user" WHERE id = $1', [ id ]);
