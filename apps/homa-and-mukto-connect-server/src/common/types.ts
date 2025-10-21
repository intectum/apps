import { PoolClient } from 'pg';

import { User } from 'homa-and-mukto-connect-core';

export type Context =
{
  client: PoolClient;
  user?: User;
};
