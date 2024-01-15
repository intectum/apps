import { FunctionComponent } from 'react';

import { getShortLocation } from './data';
import { CalendarEvent } from './types';

interface EventProps
{
  event: CalendarEvent;
  select: () => void;
}

const Event: FunctionComponent<EventProps> = ({ event, select }) =>
  <div className="o-flex o-flex--column c-event u-mb">
    <h3 className="u-m--none">
      {event.description.includes('CANCELLED') &&
        <div className="u-mb u-color--danger">Sorry this meditation has been CANCELLED</div>
      }
      {event.summary}
    </h3>
    <div>{getShortLocation(event.location)}</div>
    <div>{event.start.format('dddd, MMMM D @ h:mma')}</div>
    <button className="u-mt" onClick={() => select()}>Learn more</button>
  </div>;

export default Event;
