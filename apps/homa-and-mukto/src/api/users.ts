import fs from 'node:fs';
import path from 'node:path';

import { hash } from 'bcrypt';

import { Address, Context, FullUser, New, User } from '../types';
import { update as updateAddress } from './addresses';
import { sendMail } from './util/mail';
import { encryptKey } from './util/crypto';

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
  let fields = [ 'id', 'name', 'image', 'contacts', 'groups' ];
  if (context.user?.admin)
  {
    fields = [ ...fields, 'email', 'status', 'admin', 'pending' ];
  }

  let query = `SELECT ${fields.join(', ')} FROM "user" WHERE true`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: any[] = [];

  if (!context.user?.admin)
  {
    query += ' AND status = \'active\'';
  }

  const ids = params.get('ids')?.split(',');
  if (ids)
  {
    query += ' AND id = ANY ($1)';
    values.push(ids);
  }

  const result = await context.client.query<FullUser>(query, values);

  return result.rows;
};

export const create = async (context: Context, user: New<User>, email: string, password: string) =>
{
  const encryptedPassword = await hash(password, 12);
  const imageFields = getImageFields(user);
  if (!imageFields) throw new Error('Image not found');

  const result = await context.client.query<{ id: string }>(
    'INSERT INTO "user" (email, password, name, image, contacts, groups) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [ email, encryptedPassword, user.name, '/images/logo.png', user.contacts, user.groups ]
  );

  const id = result.rows[0].id;
  const image = `/user-images/${id}${path.extname(imageFields.fileName)}`;

  await context.client.query<User>(
    'UPDATE "user" SET image = $1 WHERE id = $2',
    [ image, id ]
  );

  fs.writeFileSync(image.substring(1), imageFields.data);

  return (await get(context, result.rows[0].id)) as User;
};

export const update = async (context: Context, user: User) =>
{
  const imageFields = getImageFields(user);

  const oldUser = await get(context, user.id) as FullUser;
  if (!oldUser) throw new Error('User not found');

  let pending: FullUser['pending'] | undefined = undefined;
  if (user.name !== oldUser.name || imageFields)
  {
    pending =
    {
      name: user.name,
      image: imageFields ? `/user-images/${user.id}-pending${path.extname(imageFields.fileName)}` : undefined
    };
  }

  await context.client.query<User>(
    'UPDATE "user" SET contacts = $1, groups = $2, pending = $3 WHERE id = $4',
    [ user.contacts, user.groups, pending, user.id ]
  );

  if (user.address) await updateAddress(context, user.address);

  if (pending && !oldUser.pending)
  {
    const adminUrl = `${context.baseUrl}/admin`;

    sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: 'A user requires their profile to be reviewed',
      text: `Open the admin panel here: ${adminUrl}`,
      html: `<h1>Review required</h1><p>Open the admin panel <a href="${adminUrl}">here</a>.</p>`
    });
  }

  if (imageFields && pending?.image)
  {
    fs.writeFileSync(pending.image.substring(1), imageFields.data);

    if (oldUser.pending?.image && oldUser.pending.image !== pending.image)
    {
      fs.rmSync(oldUser.pending.image.substring(1), { force: true });
    }
  }

  return get(context, user.id);
};

export const remove = async (context: Context, id: string) =>
{
  const user = await get(context, id);
  if (!user) return;

  await context.client.query('DELETE FROM "user" WHERE id = $1', [ id ]);

  if (user.pending?.image) fs.rmSync(user.pending.image.substring(1), { force: true });
  fs.rmSync(user.image.substring(1), { force: true });
};

export const accept = async (context: Context, id: string) =>
{
  const user = await get(context, id) as FullUser;

  const image = user.pending?.image ? user.pending?.image.replace('-pending', '') : user.image;

  await context.client.query(
    'UPDATE "user" SET status = \'active\', name = $1, image = $2, pending = NULL WHERE id = $3',
    [ user.pending?.name ?? user.name, image, id ]
  );

  const loginUrl = `${context.baseUrl}/login`;

  sendMail({
    to: user.email,
    subject: 'Your profile has been approved',
    text: `You can now login here: ${loginUrl}`,
    html: `<h1>Profile approved</h1><p>You can now login <a href="${loginUrl}">here</a>.</p>`
  });

  if (user.pending?.image)
  {
    if (fs.existsSync(user.pending.image))
    {
      fs.renameSync(user.pending.image.substring(1), image.substring(1));
    }

    if (user.image !== image)
    {
      fs.rmSync(user.image.substring(1), { force: true });
    }
  }
};

export const deny = async (context: Context, id: string) =>
{
  const user = await get(context, id) as FullUser;

  const updateUrl = `${context.baseUrl}/register?id=${id}&key=${encryptKey(id)}`;

  sendMail({
    to: user.email,
    subject: 'Your profile has been declined',
    text: `You can update your profile here: ${updateUrl}. This link will expire after 1 day. If it expires you can request another.`,
    html: `<h1>Profile declined</h1><p>You can update your profile <a href="${updateUrl}">here</a>. This link will expire after 1 day. If it expires you can request another.</p>`
  });

  if (process.env.NODE_ENV === 'development')
  {
    console.log(`You can update your profile here: ${updateUrl}. This link will expire after 1 day. If it expires you can request another.`);
  }
};

const getImageFields = (user: New<User>): { data: Buffer, fileName: string } | undefined =>
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageFields: { 'image-buffer'?: Buffer; 'image-filename'?: string } = user as any;
  if (!imageFields['image-buffer'] || !imageFields['image-filename']) return undefined;

  return { data: imageFields['image-buffer'], fileName: imageFields['image-filename'] };
};
