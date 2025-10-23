import { Address, New } from 'homa-and-mukto-core';

import { Context } from './common/types';

export const getAll = async (context: Context) =>
{
  const result = await context.client.query<Address>(
    'SELECT * FROM address JOIN "user" ON "user".id = address.user_id WHERE "user".status = \'active\''
  );

  return result.rows;
};

export const create = async (context: Context, address: New<Address>) =>
{
  const result = await context.client.query<Address>(
    'INSERT INTO address (latitude, longitude, meta, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
    [ address.latitude, address.longitude, address.meta, address.user_id ]
  );

  return result.rows[0].id;
};

export const update = async (context: Context, address: Address) =>
{
  await context.client.query<Address>(
    'UPDATE address SET latitude = $1, longitude = $2, meta = $3 WHERE id = $4',
    [ address.latitude, address.longitude, address.meta, address.id ]
  );
};
