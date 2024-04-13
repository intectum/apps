import { RefObject, useEffect } from 'react';
import MapView from 'react-native-maps';

import { LatLng } from 'vaga-core';

export const useAnimateToLocation = (ref: RefObject<MapView>, location?: LatLng) =>
{
  useEffect(() =>
  {
    if (!location)
    {
      return;
    }

    ref.current?.animateCamera({ center: location });
  }, [ location, ref ]);
};
