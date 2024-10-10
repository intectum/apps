import { faArrowUpRightFromSquare, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

import { Icon, Link, Modal } from 'apps-web';

import { formatMonthYear } from '../common/dates';
import { Client, cvUrl } from '../common/types';

interface Props
{
  client: Client;
  onDismiss?: () => void;
}

const ClientModal: FC<Props> = ({ client, onDismiss }) =>
{
  return (
    <Modal invert className="o-column u-p" onDismiss={onDismiss}>
      <div className="o-column u-center">
        <img className="c-client-modal__client-image" src={client.iconUrl} alt={client.name} />
        <div className="o-row">
          <Link href={`/projects?client=${client.slug}`} title="Projects">
            <Icon icon={faFolderOpen} />
          </Link>
          <Link href={client.link.url} title={client.link.title ?? 'Website'}>
            <Icon icon={faArrowUpRightFromSquare} />
          </Link>
        </div>
        <div className="u-text-large">{client.position}</div>
      </div>
      {client.description && <div className="u-medium-up">{client.description}</div>}
      {client.employmentType === 'contractor' && <h5>Contracts</h5>}
      {client.employmentType === 'employee' && <h5>Employments</h5>}
      <div className="o-grid">
        {client.dates.map(dates =>
          <div key={dates.startedAt} className="c-tag u-m--xs">
            {formatMonthYear(dates.startedAt)} - {formatMonthYear(dates.endedAt)}
          </div>
        )}
      </div>
      {client.reference &&
        <>
          <h5>Reference</h5>
          <p>
            {client.reference}. See <Link href={cvUrl}>my full CV</Link> for contact details.
          </p>
        </>
      }
    </Modal>
  );
};

export default ClientModal;
