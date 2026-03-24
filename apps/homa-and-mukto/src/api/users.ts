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
    'SELECT "user".id, "user".email, "user".status, "user".admin, "user".name, "user".image, "user".terms_accepted, "user".contacts, "user".groups, "user".pending, address.id as address_id, address.latitude, address.longitude, address.meta FROM "user" LEFT JOIN address ON address.user_id = "user".id WHERE "user".id = $1',
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
    terms_accepted: row.terms_accepted,
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
    fields = [ ...fields, 'email', 'status', 'admin', 'pending', 'terms_accepted' ];
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
    'INSERT INTO "user" (email, password, name, image, terms_accepted, contacts, groups) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [ email, encryptedPassword, user.name, '/images/logo.png', user.terms_accepted, user.contacts, user.groups ]
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
    'UPDATE "user" SET terms_accepted = $1, contacts = $2, groups = $3, pending = $4 WHERE id = $5',
    [ user.terms_accepted, user.contacts, user.groups, pending, user.id ]
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

  if (user.pending)
  {
    sendMail({
      to: user.email,
      subject: 'Your profile update has been approved',
      text: `You can now login here: ${loginUrl}`,
      html: `<h1>Profile update approved</h1><p>You can now login <a href="${loginUrl}">here</a>.`
    });
  }
  else
  {
    sendMail({
      to: user.email,
      subject: 'Welcome',
      text: `
        Welcome Letter
        It is a joy to welcome you to this space.
        This platform was created from the wish to support the continuation of the connections formed throughout the trainings and workshops with Homa & Mukto, connections that often remain alive long after the time shared within the group experience.
        Here, you may find others who have also walked this journey, locate them on the map, and, if you wish, connect to exchange, practice exercises learned during the trainings, reconnect with fellow participants, or simply strengthen bonds within this community.
        Participation in this space is entirely voluntary, and each person chooses what information they wish to share and how they would like to connect.
        Our intention is to offer a simple, respectful, and safe environment that facilitates reconnection and potential practice between participants who have previously shared experiences within this work.
        To preserve the quality and integrity of the community:
        all profiles are individually reviewed and approved;
        only individuals who have previously participated in trainings are granted access to the platform;
        each member is responsible for how they use this space and for the connections they choose to establish.
        We invite you to participate with presence, responsibility, respect, and awareness, so that this space may support genuine encounters, conscious practice, and the continuation of each person’s path.
        You can now login here: ${loginUrl}
        With care,
        Homa & Mukto Team
      `,
      html: `
        <h1>Welcome Letter</h1>
        <p>It is a joy to welcome you to this space.</p>
        <p>This platform was created from the wish to support the continuation of the connections formed throughout the trainings and workshops with Homa & Mukto, connections that often remain alive long after the time shared within the group experience.</p>
        <p>Here, you may find others who have also walked this journey, locate them on the map, and, if you wish, connect to exchange, practice exercises learned during the trainings, reconnect with fellow participants, or simply strengthen bonds within this community.</p>
        <p>Participation in this space is entirely voluntary, and each person chooses what information they wish to share and how they would like to connect.</p>
        <p>Our intention is to offer a simple, respectful, and safe environment that facilitates reconnection and potential practice between participants who have previously shared experiences within this work.</p>
        <p>To preserve the quality and integrity of the community:</p>
        <ul>
          <li>all profiles are individually reviewed and approved;</li>
          <li>only individuals who have previously participated in trainings are granted access to the platform;</li>
          <li>each member is responsible for how they use this space and for the connections they choose to establish.</li>
        </ul>
        <p>We invite you to participate with presence, responsibility, respect, and awareness, so that this space may support genuine encounters, conscious practice, and the continuation of each person’s path.</p>
        <p>You can now login <a href="${loginUrl}">here</a>.</p>
        <p>With care,<br />
        <strong>Homa & Mukto Team</strong></p>
      `
    });
  }

  if (user.pending?.image)
  {
    if (fs.existsSync(user.pending.image.substring(1)))
    {
      fs.renameSync(user.pending.image.substring(1), image.substring(1));
    }

    if (user.image !== image)
    {
      fs.rmSync(user.image.substring(1), { force: true });
    }
  }

  return get(context, id);
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
