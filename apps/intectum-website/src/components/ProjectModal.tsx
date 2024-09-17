'use client';

import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faAppStoreIos, faGithub, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faUserTie, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FC, useState } from 'react';

config.autoAddCss = false;
library.add(faAppStoreIos, faArrowUpRightFromSquare, faGithub, faGooglePlay, faVideo);

import { Button, Icon, Modal } from 'apps-web';

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
      <Modal shade="front" onDismiss={onDismiss}>
        <img
          className="c-project-modal__header"
          src={project.imageUrl}
          alt={project.name}
        />
        <div className="o-column u-p">
          <h3>{project.name}</h3>
          <div className="o-row">
            {project.client &&
              <Button
                clear
                square
                className="u-p--none"
                onClick={() => setClient(project.client)}
                title="Client"
              >
                <Icon icon={faUserTie} />
              </Button>
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
          <div className="o-row u-wrap">
            {project.skills.map(skill => <div key={skill.slug} className="c-skill">{skill.name}</div>)}
          </div>
        </div>
      </Modal>
      {client && <ClientModal client={client} onDismiss={() => setClient(undefined)}/>}
    </>
  );
};

export default ProjectModal;
