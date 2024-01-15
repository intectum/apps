import { FunctionComponent, useEffect } from 'react';

import { getInstructionUrl, getShortLocation } from './data';
import { CalendarEvent } from './types';

interface EventDetailProps
{
  event: CalendarEvent;
  close: () => void;
}

const EventDetail: FunctionComponent<EventDetailProps> = ({ event, close }) =>
{
  useEffect(() =>
  {
    window.history.pushState(null, event.summary, `/events/${event.id}`);

    return () =>
    {
      window.history.pushState(null, '', '/');
    };
  }, [ event ]);

  const prepareDescription = (description: string) => description
    .replace('CANCELLED', '')
    .trim()
    .replace(/\n/g, '<br>');

  return (
    <div
      className="c-event-detail"
      onClick={event =>
      {
        if (event.currentTarget === event.target)
        {
          close();
        }
      }}
    >
      <div className="c-event-detail__inner">
        <div className="o-flex">
          <h3>
            {event.description.includes('CANCELLED') &&
            <div className="u-mb u-color--danger">Sorry this meditation has been CANCELLED</div>
            }
            {event.summary}
          </h3>
          <div className="o-flex-item--1 u-text-right">
            <button onClick={() => close()}>Close</button>
          </div>
        </div>
        <div>{getShortLocation(event.location)} (<a href={ `https://www.google.com/maps?q=${encodeURIComponent(event.location)}` } target="_blank" rel="noopener noreferrer">open map</a>)</div>
        <div>{event.start.format('dddd, MMMM D @ h:mma')}</div>
        {getInstructionUrl(event.summary) &&
          <div>
            <a href={getInstructionUrl(event.summary)} target="_blank" rel="noopener noreferrer">
              Read the full instructions here
            </a>
          </div>
        }
        {event.description && <p dangerouslySetInnerHTML={ { __html: prepareDescription(event.description) } }/>}
      </div>
    </div>
  );
};

export default EventDetail;
