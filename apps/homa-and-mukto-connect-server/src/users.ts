import { hash } from 'bcrypt';

import { Address, FullUser, New, User } from 'homa-and-mukto-connect-core';

import { update as updateAddress } from './addresses';
import { Context } from './common/types';

export const get = async (context: Context, id: string, full?: boolean) =>
{
  const result = await context.client.query<FullUser & Address & { address_id: string }>(
    'SELECT "user".id, "user".email, "user".admin, "user".name, "user".image, "user".contacts, "user".groups, address.id as address_id, address.latitude, address.longitude, address.meta FROM "user" LEFT JOIN address ON address.user_id = "user".id WHERE "user".id = $1',
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

  if (!full) return user;

  const fullUser = user as FullUser;
  fullUser.email = row.email;
  fullUser.admin = row.admin;

  return fullUser;
};

export const getAll = async (context: Context, params: URLSearchParams) =>
{
  let query = 'SELECT id, name, image, contacts, groups FROM "user" WHERE status = \'active\'';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: any[] = [];

  const ids = params.get('ids')?.split(',');
  if (ids)
  {
    query += ' AND id = ANY ($1)';
    values.push(ids);
  }

  const result = await context.client.query<User>(query, values);

  return result.rows;
};

export const getReview = async (context: Context) =>
{
  const result = await context.client.query<FullUser>('SELECT id, email, name, image, contacts, groups FROM "user" WHERE status = \'review\'');

  return result.rows;
};

export const create = async (context: Context, user: New<User>, email: string, password: string) =>
{
  const encryptedPassword = await hash(password, 12);

  const result = await context.client.query<User>(
    'INSERT INTO "user" (email, password, name, image, contacts, groups) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [ email, encryptedPassword, user.name, user.image, user.contacts, user.groups ]
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

export const remove = async (context: Context, id: string) =>
{
  await context.client.query('DELETE FROM "user" WHERE id = $1', [ id ]);
};

export const activate = async (context: Context, id: string) =>
{
  await context.client.query('UPDATE "user" SET status = \'active\' WHERE id = $1', [ id ]);
};
