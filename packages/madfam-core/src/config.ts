import { Config } from './types';

const config: Config =
{
  hostName: 'madfam.org',
  googleApiKey: 'unknown',
  addressCache: { get: async () => undefined }
};

export default config;
