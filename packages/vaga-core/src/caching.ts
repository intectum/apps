import { Cache } from './types';

export const createMemoryCache = <T>(fetch: (key: string) => Promise<T>) =>
{
  const data: Record<string, T> = {};

  const cache: Cache<T> =
  {
    get: async (key: string) =>
    {
      if (!data[key])
      {
        data[key] = await fetch(key);
      }

      return data[key];
    }
  };

  return cache;
};
