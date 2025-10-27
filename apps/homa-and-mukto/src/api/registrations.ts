import { Address, Context, New, Registration, User } from '../types';
import { create as createAddress } from './addresses';
import { create as createUser } from './users';
import { transporter } from './util/mail';

export const create = async (context: Context, registration: New<Registration>) =>
{
  const user: New<User> = registration;
  const createdUser = await createUser(context, user, registration.email, registration.password);

  const address = registration.address as New<Address>;
  address.user_id = createdUser.id;
  await createAddress(context, address);

  const verifyUrl = `${context.baseUrl}/register/verify?key=${createdUser.id}`;

  await transporter.sendMail({
    to: registration.email,
    subject: 'Please verify your email',
    text: `Click this link to verify your email: ${verifyUrl}`,
    html: `<h1>Verify your email</h1><p>Click <a href="${verifyUrl}">this link</a> to verify your email.</p>`
  });
};

export const verify = async (context: Context, key: string) =>
{
  const result = await context.client.query('UPDATE "user" SET status = \'review\' WHERE id = $1 and status = \'verify\' RETURNING id', [ key ]);

  if (result.rows.length)
  {
    const adminUrl = `${context.baseUrl}/admin`;

    await transporter.sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: 'A user requires their profile to be reviewed',
      text: `Open the admin panel here: ${adminUrl}`,
      html: `<h1>Review required</h1><p>Open the admin panel <a href="${adminUrl}">here</a>.</p>`
    });
  }
};
