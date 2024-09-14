import { NextPage } from 'next';
import { Suspense } from 'react';

import ProjectGrid from './ProjectGrid';

const Projects: NextPage = () =>
  <div className="c-projects">
    <h1 className="u-text-center">projects</h1>
    <Suspense>
      <ProjectGrid />
    </Suspense>
  </div>;

export default Projects;
