import { FC } from 'react';

import { Services as ServicesType } from '../graphql/types';

type Props =
{
  services: ServicesType;
};

const Services: FC<Props> = ({ services }) =>
  <div className="u-py--xl">
    <div className="o-container u-fc u-text-center">
      <h2 className="u-pb--xl">{services.title}</h2>
      <div className="o-row">
        {services.servicesCollection?.items.map(service =>
          <div key={service?.sys.id} className="o-column">
            <h3>{service?.title}</h3>
            {service?.description}
          </div>
        )}
      </div>
    </div>
  </div>;

export default Services;
