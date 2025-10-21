import { Address, New, Registration, User } from 'homa-and-mukto-connect-core';

import { create as createAddress } from './addresses';
import { Context } from './common/types';
import { create as createUser } from './users';

export const create = async (context: Context, registration: New<Registration>) =>
{
  const user: New<User> = registration;
  const createdUser = await createUser(context, user, registration.email, registration.password);

  const address = registration.address as New<Address>;
  address.user_id = createdUser.id;
  await createAddress(context, address);
};
