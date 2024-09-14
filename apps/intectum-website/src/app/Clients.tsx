'use client';

import { FC, useState } from 'react';

import { Button, Circle } from 'apps-web';

import { Client } from '../common/types';
import ClientModal from '../components/ClientModal';

type Props =
{
  clients: Client[];
};

const Clients: FC<Props> = ({ clients }) =>
{
  const [ client, setClient ] = useState<Client>();

  const activeClients = clients.filter(client => client.active).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="c-home-clients">
        <div className="c-home-clients__body u-flex u-flex--centered">
          <Circle shade="medium" className="o-scroll-animation c-home-clients__outer u-flex u-flex--centered u-m">
            {activeClients.map((client, index) =>
              <Button
                key={client.slug}
                clear
                className="o-scroll-animation c-home-clients__client u-p--none"
                onClick={() => setClient(client)}
                style={{
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ['--client-index' as any]: index,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ['--client-count' as any]: activeClients.length
                }}
              >
                <img className="c-home-clients__client-image" src={client.iconUrl} alt={client.name} loading="lazy" />
              </Button>
            )}
            <Circle shade="front" className="o-scroll-animation c-home-clients__inner"/>
          </Circle>
          <div className="c-home-clients__detail u-flex u-flex--column u-flex--spaced u-text-center u-m">
            <h2>Clients</h2>
            {/* <div className="u-text-large">Trusted by my clients, many of whom I have partnered with on multiple contracts</div> */}
            <blockquote>
              Loved working with Gyan. He is a great software engineer with a deep knowledge spanning multiple verticals
              across the space. Level-headed and pragmatic he takes on any challenge with confidence and a smile.
              Would recommend Gyan for any software endeavour.
            </blockquote>
            <div>- Logan Maire, Colenso BBDO</div>
          </div>
        </div>
      </div>
      {client && <ClientModal client={client} onDismiss={() => setClient(undefined)}/>}
    </>
  );
};

export default Clients;
