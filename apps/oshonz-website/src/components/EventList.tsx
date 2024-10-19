'use client';

import { DateTime } from 'luxon';
import { FC, useState } from 'react';

import { Button, Link, Modal, Panel } from 'apps-web';

import { getInstructionUrl, getShortAddress } from '../common/data';
import { Event } from '../common/types';

type Props =
{
  events: Event[];
};

const EventList: FC<Props> = ({ events }) =>
{
  const [ event, setEvent ] = useState<Event>();

  const description = event?.description
    .replace('CANCELLED', '')
    .trim()
    .replace(/\n/g, '<br>');

  return (
    <>
      <div className="o-column">
        {!events.length && 'Oops! There\'s nothing here yet. Please check again later or join the mailing list (below) to get notified.'}
        {events.map(event =>
          <Panel
            key={event.id}
            theme="stone"
            invert
            className="o-column u-rounded u-p"
          >
            <div>
              <h3 className="o-column">
                {event.description.includes('CANCELLED') &&
                  <div className="u-color--danger">Sorry this meditation has been CANCELLED</div>
                }
                {event.summary}
              </h3>
              <div>{getShortAddress(event.address)}</div>
              <div>{DateTime.fromISO(event.start).toFormat('EEEE, MMMM d @ h:mm a')}</div>
            </div>
            <div>
              <Button invert onClick={() => setEvent(event)}>
                Learn more
              </Button>
            </div>
          </Panel>
        )}
      </div>

      {event &&
        <Modal
          className="o-column u-rounded u-p"
          onDismiss={() => setEvent(undefined)}
        >
          <h3 className="o-column">
            {event.description.includes('CANCELLED') &&
              <div className="u-color--danger">Sorry this meditation has been CANCELLED</div>
            }
            {event.summary}
          </h3>
          <div>{getShortAddress(event.address)} (<Link href={ `https://www.google.com/maps?q=${encodeURIComponent(event.address)}`}>open map</Link>)</div>
          <div>{DateTime.fromISO(event.start).toFormat('EEEE, MMMM d @ h:mm a')}</div>
          {getInstructionUrl(event.summary) &&
            <Link href={getInstructionUrl(event.summary)}>
              Read the full instructions here
            </Link>
          }
          {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
        </Modal>
      }
    </>
  );
};

export default EventList;
