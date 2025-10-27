import { hash } from 'bcrypt';

import { Address, Context, FullUser, New, User } from '../types';
import { update as updateAddress } from './addresses';
import { transporter } from './util/mail';

export const get = async (context: Context, id: string) =>
{
  const result = await context.client.query<FullUser & Address & { address_id: string }>(
    'SELECT "user".id, "user".email, "user".status, "user".admin, "user".name, "user".image, "user".contacts, "user".groups, "user".pending, address.id as address_id, address.latitude, address.longitude, address.meta FROM "user" LEFT JOIN address ON address.user_id = "user".id WHERE "user".id = $1',
    [ id ]
  );

  if (!result.rows.length) return undefined;

  const row = result.rows[0];

  const user: FullUser =
  {
    id: row.id,
    email: row.email,
    password: '********',
    status: row.status,
    admin: row.admin,
    name: row.name,
    image: row.image,
    contacts: row.contacts,
    groups: row.groups,
    pending: row.pending,
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
  const result = await context.client.query<FullUser>('SELECT id, email, status, admin, name, image, contacts, groups, pending FROM "user" WHERE status = \'review\' OR pending IS NOT NULL');

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
  const oldUser = await get(context, user.id) as FullUser;
  if (!oldUser) throw new Error('User not found');

  let pending: FullUser['pending'] | undefined = undefined;
  if (user.name !== oldUser.name || user.image !== oldUser.image)
  {
    pending = { name: user.name, image: user.image };
  }

  await context.client.query<User>(
    'UPDATE "user" SET contacts = $1, groups = $2, pending = $3 WHERE id = $4',
    [ user.contacts, user.groups, pending, user.id ]
  );

  if (user.address) await updateAddress(context, user.address);

  if (pending && !oldUser.pending)
  {
    const adminUrl = `${context.baseUrl}/admin`;

    await transporter.sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: 'A user requires their profile to be reviewed',
      text: `Open the admin panel here: ${adminUrl}`,
      html: `<h1>Review required</h1><p>Open the admin panel <a href="${adminUrl}">here</a>.</p>`
    });
  }

  return get(context, user.id);
};

export const remove = async (context: Context, id: string) =>
{
  await context.client.query('DELETE FROM "user" WHERE id = $1', [ id ]);
};

export const activate = async (context: Context, id: string) =>
{
  const user = await get(context, id) as FullUser;

  await context.client.query(
    'UPDATE "user" SET status = \'active\', name = $1, image = $2, pending = NULL WHERE id = $3',
    [ user.pending?.name ?? user.name, user.pending?.image ?? user.image, id ]
  );

  if (user.status === 'review')
  {
    const loginUrl = `${context.baseUrl}/login`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Your profile has been approved',
      text: `You can now login here: ${loginUrl}`,
      html: `<h1>Profile approved</h1><p>You can now login <a href="${loginUrl}">here</a>.</p>`
    });
  }
};
