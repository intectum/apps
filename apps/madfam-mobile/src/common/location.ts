import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

import native from './native';

export const updateLocation = async () =>
{
  if ((await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)) === RESULTS.GRANTED)
  {
    native.updateLocationInBackground(60 * 24 /* every day */);
  }
  else if ((await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)) === RESULTS.GRANTED)
  {
    await native.updateLocation();
  }
};
