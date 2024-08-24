'use client';

import { FC, useState } from 'react';

import { Icon, Modal } from 'apps-web';

import { Client, Project } from '../common/types';
import ClientModal from '../components/ClientModal';

interface Props
{
  project: Project;
  onDismiss?: () => void;
}

const ProjectModal: FC<Props> = ({ project, onDismiss }) =>
{
  const [ client, setClient ] = useState<Client>();

  return (
    <>
      <Modal onDismiss={onDismiss}>
        <img
          className="c-project-modal__header"
          src={project.imageUrl}
          alt={project.name}
        />
        <div className="u-flex u-flex--column u-flex--spaced u-p">
          <h3>{project.name}</h3>
          <div className="u-flex u-flex--spaced">
            {project.client &&
              <button
                type="button"
                className="c-button c-button--minimal u-color--primary"
                onClick={() => setClient(project.client)}
                title="Client"
              >
                <Icon icon="user-tie" />
              </button>
            }
            {project.links.map(link =>
              <a
                key={link.url}
                href={link.url}
                title={link.title ?? 'Open'}
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon={link.icon ?? 'arrow-up-right-from-square'} />
              </a>
            )}
          </div>
          {project.description && <div className="u-small">{project.description}</div>}
          <div className="u-flex u-flex--spaced u-flex--wrap">
            {project.skills.map(skill => <div key={skill.slug} className="c-skill">{skill.name}</div>)}
          </div>
        </div>
      </Modal>
      {client && <ClientModal client={client} onDismiss={() => setClient(undefined)}/>}
    </>
  );
};

export default ProjectModal;
