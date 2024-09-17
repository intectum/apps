'use client';

import { DateTime } from 'luxon';
import { FC, useEffect, useState } from 'react';

import { getGeocodedEvents } from '../common/data';
import { Event } from '../common/types';
import EventList from './EventList';
import EventMap from './EventMap';

const Events: FC = () =>
{
  const [ events, setEvents ] = useState<Event[]>();

  useEffect(() =>
  {
    const timeMin = DateTime.now().setZone('Pacific/Auckland').startOf('week').toISO() ?? undefined;
    const timeMax = DateTime.now().setZone('Pacific/Auckland').endOf('week').toISO() ?? undefined;

    getGeocodedEvents(timeMin, timeMax).then(setEvents);
  }, []);

  if (!events)
  {
    return 'Searching for meditations...';
  }

  return (
    <div className="o-row c-events">
      <div className="u-f1">
        <EventList events={events} />
      </div>
      <div className="u-f1">
        <EventMap events={events} />
      </div>
    </div>
  );
};

export default Events;
