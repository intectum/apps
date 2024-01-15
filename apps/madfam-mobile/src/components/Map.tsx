import { forwardRef, useMemo } from 'react';
import MapView, { MapStyleElement, MapViewProps } from 'react-native-maps';

import { Themes } from 'apps-core';
import { useThemes } from 'apps-mobile';

const Map = forwardRef<MapView, MapViewProps>((mapViewProps, ref) =>
{
  const themes = useThemes();

  const mapStyle = useMemo(() => getMapStyle(themes), [ themes ]);

  return (
    <MapView
      ref={ref}
      customMapStyle={mapStyle}
      loadingBackgroundColor={themes.monochrome.back}
      pitchEnabled={false}
      rotateEnabled={false}
      toolbarEnabled={false}
      {...mapViewProps}
    />
  );
});

const getMapStyle = (themes: Themes): MapStyleElement[] =>
  [
    {
      elementType: 'geometry',
      stylers:
      [
        {
          'color': themes.grass.back
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers:
      [
        {
          'color': themes.stone.front
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers:
      [
        {
          'color': themes.stone.back
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      featureType: 'administrative.neighborhood',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'labels',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'labels',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      featureType: 'poi',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      featureType: 'road',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers:
      [
        {
          'color': themes.water.back
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers:
      [
        {
          'visibility': 'off'
        }
      ]
    }
  ];

export default Map;
