'use client';

import { FC, ReactNode, useState } from 'react';

import { Button, Link, Panel } from 'apps-web';

import { Project } from '../../common/types';
import ProjectModal from '../ProjectModal';

type Props =
{
  projects: Project[];
};

const Projects: FC<Props> = ({ projects }) =>
{
  const [ project, setProject ] = useState<Project>();

  const Page: FC<{ index: number, children: [ ReactNode, ReactNode ] }> = ({ index, children }) =>
    <div
      className="o-scroll-animation c-home-projects__page"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{ ['--page-index' as any]: index }}
    >
      <Panel invert className="c-home-projects__page-side c-home-projects__page-side--front">
        {children[0]}
      </Panel>
      <Panel invert className="o-scroll-animation c-home-projects__page-side c-home-projects__page-side--back">
        {children[1]}
      </Panel>
    </div>;

  const Grid: FC<Props> = ({ projects }) =>
    <div className="c-home-projects__grid u-f1">
      {projects.map(project =>
        <Button
          square
          key={`${project.name}-${project.dates.startedAt}`}
          className="c-home-projects__grid-item u-p--none"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
          onClick={() => setProject(project)}
        />
      )}
    </div>;

  return (
    <>
      <div className="c-home-projects u-container">
        <div className="c-home-projects__body u-fr u-center">
          <div className="c-home-projects__detail u-fc u-gap u-text-center u-m">
            <h2>Projects</h2>
            <div className="u-text-large">60+ and counting</div>
            <div>See all of them <Link href="/projects" title="All projects">here</Link></div>
          </div>
          <div
            className="o-scroll-animation c-home-projects__catalog u-m"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ ['--page-count' as any]: 3 }}
          >
            <Page index={0}>
              <div className="u-fr u-center u-f1">
                <h3>Catalog</h3>
              </div>
              <Grid projects={projects.slice(0, 10)}/>
            </Page>
            <Page index={1}>
              <Grid projects={projects.slice(10, 20)}/>
              <Grid projects={projects.slice(20, 30)}/>
            </Page>
            <Page index={2}>
              <Grid projects={projects.slice(30, 40)}/>
              <div className="u-fr u-center u-f1">
                <div>to be continued...</div>
              </div>
            </Page>
          </div>
        </div>
      </div>
      {project && <ProjectModal project={project} onDismiss={() => setProject(undefined)} />}
    </>
  );
};

export default Projects;
