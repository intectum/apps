import { FC } from 'react';
import { Link } from 'react-router-dom';

import { formatMonthYear } from '../common/dates';
import { Client, cvUrl } from '../common/types';
import Modal from './Modal';

interface Props
{
  client: Client;
  onDismiss?: () => void;
}

const ClientModal: FC<Props> = ({ client, onDismiss }) =>
{
  return (
    <Modal onDismiss={onDismiss}>
      <>
        <div className="o-split">
          <h4>{client.position} @ {client.name}</h4>
          <button type="button" className="c-button" onClick={onDismiss}>
            &times;
          </button>
        </div>
        {client.description.map(paragraph => <p className="u-medium">{paragraph}</p>)}
        {client.employmentType === 'contractor' && <h5>Contracts</h5>}
        {client.employmentType === 'employee' && <h5>Employments</h5>}
        <div className="o-grid">
          {client.dates.map(dates => <div className="c-tag u-m--xs">{formatMonthYear(dates.startedAt)} - {formatMonthYear(dates.endedAt)}</div>)}
        </div>
        {client.reference &&
          <>
            <h5>Reference</h5>
            <p>{client.reference}. See <a href={cvUrl} target="_blank" rel="noreferrer">my full CV</a> for contact details.</p>
          </>
        }
        <Link className="c-button c-button--primary u-m--sm" to={`/projects?q=${client.name}`}>projects</Link>
        <a href={client.link} target="_blank" rel="noreferrer" className="c-button c-button--primary u-m--sm">website</a>
      </>
    </Modal>
  );
};

export default ClientModal;
