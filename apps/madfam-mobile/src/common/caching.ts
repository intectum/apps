import AsyncStorage from '@react-native-async-storage/async-storage';

import { Cache } from 'madfam-core';

export const createAsyncStorageCache = async <T>(storageKey: string, fetch: (key: string) => Promise<T>) =>
{
  const item = await AsyncStorage.getItem(storageKey);
  const data = item ? JSON.parse(item) as Record<string, T> : {};

  const cache: Cache<T> =
  {
    get: async (key: string) =>
    {
      if (!data[key])
      {
        data[key] = await fetch(key);
        await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      }

      return data[key];
    }
  };

  return cache;
};
