import { NextPage } from 'next';
import { Suspense } from 'react';

import ProjectGrid from '../../components/ProjectGrid';

const Projects: NextPage = () =>
  <div className="o-container c-projects">
    <h1 className="u-text-center">projects</h1>
    <Suspense>
      <ProjectGrid />
    </Suspense>
  </div>;

export default Projects;
