import { defineString } from 'firebase-functions/params';

import { Address, config, createMemoryCache, fromAddressKey, geocode } from 'madfam-core';

export const initConfig = () =>
{
  config.googleApiKey = defineString('GOOGLE_API_KEY').value();
  config.addressCache = createMemoryCache<Address | undefined>(key => geocode(fromAddressKey(key)));
};
