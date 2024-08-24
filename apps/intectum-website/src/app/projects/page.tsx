import { NextPage } from 'next';

import ProjectGrid from '@/app/projects/ProjectGrid';
import { Suspense } from 'react';

const Projects: NextPage = () =>
{
  return (
    <div className="c-projects">
      <h1 className="u-text-center">projects</h1>
      <Suspense>
        <ProjectGrid />
      </Suspense>
    </div>
  );
};

export default Projects;
