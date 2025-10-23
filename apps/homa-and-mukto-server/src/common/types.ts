import { PoolClient } from 'pg';

import { FullUser } from 'homa-and-mukto-core';

export type Context =
{
  client: PoolClient;
  user?: FullUser;
};
