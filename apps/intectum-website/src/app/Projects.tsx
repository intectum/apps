'use client';

import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';

import { Project } from '../common/types';
import ProjectModal from '../components/ProjectModal';

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
      <div className="c-home-projects__page-side c-home-projects__page-side--front">
        {children[0]}
      </div>
      <div className="o-scroll-animation c-home-projects__page-side c-home-projects__page-side--back">
        {children[1]}
      </div>
    </div>;

  const Grid: FC<Props> = ({ projects }) =>
    <div className="c-home-projects__grid u-flex-item--1">
      {projects.map(project =>
        <button
          key={`${project.name}-${project.dates.startedAt}`}
          type="button"
          className="c-home-projects__grid-item c-button u-p--none"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
          onClick={() => setProject(project)}
        />
      )}
    </div>;

  return (
    <>
      <div className="c-home-projects">
        <div className="c-home-projects__body u-flex u-flex--centered">
          <div className="c-home-projects__detail u-flex u-flex--column u-flex--spaced u-text-center u-m">
            <h2>Projects</h2>
            <div className="u-text-large">60+ and counting</div>
            <div>See all of them <Link href="/projects">here</Link></div>
          </div>
          <div
            className="o-scroll-animation c-home-projects__catalog u-m"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ ['--page-count' as any]: 3 }}
          >
            <Page index={0}>
              <div className="u-flex u-flex--centered u-flex-item--1">
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
              <div className="u-flex u-flex--centered u-flex-item--1">
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
