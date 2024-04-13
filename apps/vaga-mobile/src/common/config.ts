import { config, fromAddressKey, geocode } from 'vaga-core';

import { createAsyncStorageCache } from './caching';
import native from './native';

export const initConfig = async () =>
{
  config.googleApiKey = await native.getGoogleApiKey();
  config.addressCache = await createAsyncStorageCache('addresses', key => geocode(fromAddressKey(key)));
};
