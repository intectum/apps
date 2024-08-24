import Link from 'next/link';
import { FC } from 'react';

import { Icon, Modal } from 'apps-web';

import '../common/fontawesome'; // TODO refine, this is only needed once in any client component?
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
    <Modal className="u-flex u-flex--column u-flex--spaced u-p" onDismiss={onDismiss}>
      <div className="u-flex u-flex--column u-flex--centered u-flex--spaced">
        <img className="c-client-modal__client-image" src={client.iconUrl} alt={client.name}/>
        <div className="u-flex u-flex--spaced">
          <Link href={`/projects?client=${client.slug}`} title="Projects">
            <Icon icon="folder-open" />
          </Link>
          <a
            href={client.link.url}
            title={client.link.title ?? 'Website'}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <Icon icon={client.link.icon ?? 'arrow-up-right-from-square'} />
          </a>
        </div>
        <div className="u-text-large">{client.position}</div>
      </div>
      {client.description && <div className="u-medium">{client.description}</div>}
      {client.employmentType === 'contractor' && <h5>Contracts</h5>}
      {client.employmentType === 'employee' && <h5>Employments</h5>}
      <div className="o-grid">
        {client.dates.map(dates =>
          <div className="c-tag u-m--xs">
            {formatMonthYear(dates.startedAt)} - {formatMonthYear(dates.endedAt)}
          </div>
        )}
      </div>
      {client.reference &&
        <>
          <h5>Reference</h5>
          <p>
            {client.reference}. See <a href={cvUrl} target="_blank" rel="noreferrer">my full CV</a> for contact details.
          </p>
        </>
      }
    </Modal>
  );
};

export default ClientModal;
