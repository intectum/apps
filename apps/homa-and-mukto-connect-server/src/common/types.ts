import { PoolClient } from 'pg';

import { FullUser } from 'homa-and-mukto-connect-core';

export type Context =
{
  client: PoolClient;
  user?: FullUser;
};
