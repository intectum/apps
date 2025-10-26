import { hash } from 'bcrypt';

import { Context } from '../common/types';
import { decrypt, encrypt } from './util/crypto';
import { transporter } from './util/mail';

const timeout = 60 * 60 * 1000; // 1 hour

export const create = async (context: Context, email: string) =>
{
  const result = await context.client.query<{ id: string }>(
    'SELECT "user".id FROM "user" WHERE "user".email = $1',
    [ email ]
  );

  if (!result.rows.length) return undefined;

  const row = result.rows[0];

  const key = encrypt(`${row.id}|${Date.now()}`);
  const resetUrl = `${context.baseUrl}/login/password/reset?key=${key}`;

  await transporter.sendMail({
    to: email,
    subject: 'Reset your password',
    text: `Click this link to reset your password: ${resetUrl}`,
    html: `<h1>Reset your password</h1><p>Click <a href="${resetUrl}">this link</a> to reset your password.</p>`
  });
};

export const update = async (context: Context, key: string, password: string) =>
{
  const [ id, timestampString ] = decrypt(key).split('|');
  const timestamp = Number(timestampString);

  if (isNaN(timestamp) || Date.now() > timestamp + timeout) throw new Error('Invalid or expired timestamp');

  const encryptedPassword = await hash(password, 12);

  await context.client.query(
    'UPDATE "user" SET password = $1 WHERE "user".id = $2',
    [ encryptedPassword, id ]
  );
};
