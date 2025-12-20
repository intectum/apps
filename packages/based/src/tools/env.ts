import { config, DotenvConfigOptions } from 'dotenv';

export const env = (addDevConfig: boolean) =>
{
  const options: DotenvConfigOptions = {};
  if (addDevConfig) options.path =[ '.env.development', '.env' ];

  const output = config(options);
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

  return output;
};
