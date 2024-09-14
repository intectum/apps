'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';

import { Button } from 'apps-web';

import { getProjects } from '../../common/data';
import { Project } from '../../common/types';
import ProjectModal from '../../components/ProjectModal';

const queryDelay = 2 * 1000; // 2 seconds

const ProjectGrid: FC = () =>
{
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryTimeout = useRef<number>();
  const [ project, setProject ] = useState<Project>();
  const [ projects, setProjects ] = useState<Project[]>();
  const [ query, setQuery ] = useState(searchParams.get('q') ?? '');
  const [ queryInput, setQueryInput ] = useState(searchParams.get('q') ?? '');

  useEffect(() =>
  {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('client', searchParams.get('client') ?? '');
    newSearchParams.set('q', query);
    router.replace(`/projects?${newSearchParams.toString()}`);

    getProjects(searchParams.get('client') ?? undefined, query).then(setProjects);
  }, [ query, searchParams ]);

  const submit = (event: FormEvent) =>
  {
    event.preventDefault();

    if (queryTimeout.current)
    {
      clearTimeout(queryTimeout.current);
    }

    setQuery(queryInput);
  };

  const onQueryChange = (newQuery: string) =>
  {
    setQueryInput(newQuery);

    if (queryTimeout.current)
    {
      clearTimeout(queryTimeout.current);
    }

    queryTimeout.current = window.setTimeout(() => setQuery(newQuery), queryDelay);
  };

  return (
    <>
      <form className="u-text-center u-my" onSubmit={submit}>
        <input
          type="search"
          className="c-project-grid__search"
          placeholder="What are you looking for?"
          value={queryInput}
          onChange={event => onQueryChange(event.target.value)}
        />
      </form>
      <div className="c-project-grid__grid">
        {projects?.map((project, index) =>
          <Button
            key={`${project.name}-${project.dates.startedAt}`}
            square
            shade="front"
            className="c-project-grid__preview u-flex u-p--none"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ ['--project-index' as any]: index }}
            onClick={() => setProject(project)}
          >
            <img
              className="u-flex-item--1"
              src={project.imageUrl}
              alt={project.name}
            />
          </Button>
        )}
      </div>
      {project && <ProjectModal project={project} onDismiss={() => setProject(undefined)}/>}
    </>
  );
};

export default ProjectGrid;
