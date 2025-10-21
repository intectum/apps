import { PoolClient } from 'pg';

export type Context =
{
  client: PoolClient;
};
