'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { getMapsLibrary } from '../common/google';
import { Event } from '../common/types';

type Props =
{
  events: Event[];
};

const EventMap: FC<Props> = ({ events }) =>
{
  const mapRef = useRef<HTMLDivElement>(null);
  const [ map, setMap ] = useState<google.maps.Map>();
  const [ markers, setMarkers ] = useState<google.maps.Marker[]>([]);

  useEffect(() =>
  {
    getMapsLibrary().then(maps =>
    {
      if (mapRef.current)
      {
        setMap(new maps.Map(
          mapRef.current,
          {
            center:
            {
              lat: -36.8485,
              lng: 174.7633
            },
            zoom: 10
          }
        ));
      }
    });
  }, []);

  useEffect(() =>
  {
    if (!map)
    {
      return;
    }

    for (const marker of markers)
    {
      marker.setMap(null);
    }

    setMarkers(events
      .filter(event => event.location)
      .map(event => new google.maps.Marker({
        map,
        title: event.address,
        position: event.location
      }))
    );

    if (events.length)
    {
      const bounds = new google.maps.LatLngBounds();
      for (const event of events)
      {
        if (event.location)
        {
          bounds.extend(event.location);
        }
      }

      map.fitBounds(bounds);
    }
  }, [ events, map ]);

  return <div ref={mapRef} className="c-map" />;
};

export default EventMap;
