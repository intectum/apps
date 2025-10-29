import { hash } from 'bcrypt';

import { Context } from '../types';
import { encryptKey } from './util/crypto';
import { sendMail } from './util/mail';

export const create = async (context: Context, email: string) =>
{
  const result = await context.client.query<{ id: string }>(
    'SELECT "user".id FROM "user" WHERE "user".email = $1',
    [ email ]
  );

  if (!result.rows.length) return undefined;

  const row = result.rows[0];

  const resetUrl = `${context.baseUrl}/login/password/reset?key=${encryptKey(row.id)}`;

  sendMail({
    to: email,
    subject: 'Reset your password',
    text: `Click this link to reset your password: ${resetUrl}. This link will expire after 1 day.`,
    html: `<h1>Reset your password</h1><p>Click <a href="${resetUrl}">this link</a> to reset your password. This link will expire after 1 day.</p>`
  });

  if (process.env.NODE_ENV === 'development')
  {
    console.log(`Click this link to reset your password: ${resetUrl}. This link will expire after 1 day.`);
  }
};

export const update = async (context: Context, password: string) =>
{
  const encryptedPassword = await hash(password, 12);

  await context.client.query(
    'UPDATE "user" SET password = $1 WHERE "user".id = $2',
    [ encryptedPassword, context.user?.id ]
  );
};
