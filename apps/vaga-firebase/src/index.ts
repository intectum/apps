import { initializeApp } from 'firebase-admin/app';
import { setGlobalOptions } from 'firebase-functions/v2/options';

import { initConfig } from './config';

initConfig();
initializeApp();

setGlobalOptions({ maxInstances: 10 });

export * from './auth';
export * from './google-cloud/auth';
export * from './google-cloud/calendar';
export * from './heat-maps';
export * from './invitations';
export * from './location';
export * from './users';
