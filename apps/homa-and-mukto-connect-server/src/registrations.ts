import { Address, New, Registration, User } from 'homa-and-mukto-connect-core';

import { create as createAddress } from './addresses';
import { Context } from './common/types';
import { mailTransporter } from './common/util';
import { create as createUser } from './users';

export const create = async (context: Context, registration: New<Registration>) =>
{
  const user: New<User> = registration;
  const createdUser = await createUser(context, user, registration.email, registration.password);

  const address = registration.address as New<Address>;
  address.user_id = createdUser.id;
  await createAddress(context, address);

  const verifyUrl = `${process.env.CLIENT_BASE_URL}/register/verify?key=${createdUser.id}`;

  await mailTransporter.sendMail({
    to: registration.email,
    subject: 'Please verify your email',
    text: `Click this link to verify your email: ${verifyUrl}`,
    html: `<h1>Verify your email</h1><p>Click this link to verify your email: ${verifyUrl}</p>`
  });
};

export const verify = async (context: Context, key: string) =>
{
  await context.client.query<User>('UPDATE "user" SET status = \'review\' WHERE id = $1 and status = \'verify\'', [ key ]);
};
