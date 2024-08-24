import moment from 'moment';
import { FunctionComponent, useEffect, useState } from 'react';

import { getQuotes } from './data';
import Event from './Event';
import EventDetail from './EventDetail';
import { geocode, getEvents, loadGapi } from './google';
import { CalendarEvent } from './types';

const App: FunctionComponent = () =>
{
  const [ quote, setQuote ] = useState<string>();
  const [ event, setEvent ] = useState<CalendarEvent>();
  const [ events, setEvents ] = useState<CalendarEvent[]>();

  useEffect(() =>
  {
    getQuotes()
      .then(quotes => setQuote(quotes[Math.floor(Math.random() * quotes.length)]));

    loadGapi()
      .then(() => getEvents(moment().startOf('week'), moment().endOf('week')))
      .then(async events =>
      {
        setEvents(events);

        if (window.location.pathname.startsWith('/events/'))
        {
          setEvent(events.find(event => event.id === window.location.pathname.substring('/events/'.length)));
        }

        const addresses = new Set<string>();
        for (const event of events)
        {
          addresses.add(event.location);
        }

        const map = new google.maps.Map(document.getElementById('map') as HTMLElement);

        const bounds = new google.maps.LatLngBounds();
        for (const address of Array.from(addresses))
        {
          const position = await geocode(address);
          if (position)
          {
            new google.maps.Marker({ position, map, title: address });
            bounds.extend(position);
          }
        }

        map.fitBounds(bounds);
      });
  }, []);

  return (
    <>
      <header>
        <div className="o-container">
          <img src="/logo.png" alt="OSHO"/>
          <h1 className="u-my--none">Information Center</h1>
          Auckland, New Zealand
        </div>
      </header>

      <main className="o-container">
        <section>
          {quote &&
            <blockquote>
              <div>
                <em>{quote}</em>
              </div>
              <div className="u-ml">
                <strong>- Osho</strong>
              </div>
            </blockquote>
          }
        </section>

        <section>
          <h2>OSHO Active Meditations</h2>

          <p>Everyone is welcome to come and experience OSHO's active meditations! They are designed to help modern people enter into meditation. To learn more, see <a href="https://www.osho.com/meditation/osho-active-meditations/why-active-meditations" target="_blank" rel="noopener noreferrer">Why active meditations?</a> We host meditations at a few locations so make sure you come to the right one :P</p>

          <p><strong><em>Please arrive ten minutes before the meditation starts. It is best to join the mailing list (below) so that we can notify you if we have a cancellation.</em></strong></p>

          <p><strong>Introductory pricing:</strong> $10 per meditation</p>

          <h3>This week's meditations</h3>

          <div className="u-flex-desktop">
            <div className="u-flex-item--1">
              {!events &&
                <>Loading...</>
              }

              {events && !events.length &&
                <>Oops! There's nothing here yet. Please check again later or join the mailing list (below) to get notified</>
              }

              {events && !!events.length && events.map((event, index) =>
                <Event
                  key={index}
                  event={event}
                  select={() => setEvent(event)}
                />
              )}
            </div>

            <div className="u-flex-item--1">
              <div className="o-aspect--wide">
                <div id="map" className="c-map"/>
              </div>
            </div>
          </div>

          {event &&
            <EventDetail
              event={event}
              close={() => setEvent(undefined)}
            />
          }
        </section>

        <section>
          <h2>Got questions? Want to join the mailing list?</h2>

          <p>Don't hesitate to contact Gyan at <a href="mailto:info@osho.nz">info@osho.nz</a>. For more information about Osho, you can also go to <a href="http://www.osho.com" target="_blank" rel="noopener noreferrer">www.osho.com</a>.</p>
        </section>
      </main>

      <footer>
        <div className="o-container">
          <div>
            <small>OSHO is a registered trademark of Osho International Foundation, used with permission, <a href="http://www.osho.com/trademarks" target="_blank" rel="noopener noreferrer">www.osho.com/trademarks</a></small>
          </div>
          <div>
            <small>Some material used here (images and text excerpts) is Copyright &copy; OSHO International Foundation, <a href="http://www.osho.com/copyright" target="_blank" rel="noopener noreferrer">www.osho.com/copyright</a></small>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
