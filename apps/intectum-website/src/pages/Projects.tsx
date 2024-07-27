import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getProjects, getTags } from '../common/data';
import { formatMonthYear } from '../common/dates';
import { Client, Project, Tag } from '../common/types';
import ClientModal from '../components/ClientModal';

const queryDelay = 2 * 1000; // 2 seconds

const Projects: FC = () =>
{
  const queryTimeout = useRef<number>();
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ client, setClient ] = useState<Client>();
  const [ allTags, setAllTags ] = useState<Tag[]>();
  const [ projects, setProjects ] = useState<Project[]>();
  const [ query, setQuery ] = useState(searchParams.get('q') ?? '');
  const [ queryInput, setQueryInput ] = useState(searchParams.get('q') ?? '');
  const [ tags, setTags ] = useState(searchParams.getAll('tag').map(slug => ({ slug } as Tag)) ?? []);

  useEffect(() =>
  {
    setSearchParams(
      {
        q: query || [],
        tag: tags.map(tag => tag.slug)
      },
      {
        replace: true
      }
    );

    getProjects(tags, query).then(setProjects);
    getTags().then(setAllTags);
  }, [ query, setSearchParams, tags ]);

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

  const isTagActive = (tag: Tag) => !!tags?.find(theTag => theTag.slug === tag.slug);

  const toggleTag = (tag: Tag) =>
  {
    const index = tags.findIndex(theTag => theTag.slug === tag.slug);

    if (index === -1)
    {
      setTags([ ...tags, tag ]);
    }
    else
    {
      const tagsLocal = [ ...tags ];
      tagsLocal.splice(index, 1);
      setTags(tagsLocal);
    }
  };

  return (
    <>
      <div className="o-container">
        <h1><span className="u-color--primary">project</span> history</h1>
        <p>Here I have collected some of the projects I have worked on.</p>
        <form className="u-my" onSubmit={submit}>
          <input
            type="search"
            className="u-my"
            placeholder="What are you looking for?"
            value={queryInput}
            onChange={event => onQueryChange(event.target.value)}
          />
        </form>
        <div className="o-grid u-my">
          {allTags?.sort((a, b) => a.name.localeCompare(b.name)).map(tag =>
            <button
              key={tag.slug}
              type="button"
              className={`c-tag c-tag--primary${isTagActive(tag) ? ' c-tag--active' : ''} u-m--xs`}
              onClick={() => toggleTag(tag)}
            >
              {tag.name}
            </button>
          )}
        </div>
        <div className="o-columns-2 o-columns--gutless">
          {projects?.map(project =>
            <div key={`${project.name}|${project.dates.startedAt}|${project.dates.endedAt}`} className="t-slide-up c-card u-m">
              {project.mediaUrl &&
                <div className="c-card__header-container">
                  {!project.mediaUrl.includes('youtube') &&
                    <img
                      src={project.mediaUrl}
                      alt={project.name}
                      className="c-card__header-content"
                    />
                  }
                  {project.mediaUrl.includes('youtube') &&
                    <iframe
                      title={project.name}
                      src={project.mediaUrl}
                      className="c-card__header-content"
                      allowFullScreen
                    />
                  }
                </div>
              }
              <h3>{project.name}</h3>
              <strong className="u-mb">
                {project.client && <>{project.client.name}{project.endClient ? ' (' + project.endClient + ')' : ''}, </>}
                {project.dates.yearOnly && <>{project.dates.startedAt}{project.dates.endedAt ? ' - ' + project.dates.endedAt : ''}</>}
                {!project.dates.yearOnly && <>{formatMonthYear(project.dates.startedAt)}{project.dates.endedAt ? ' - ' + formatMonthYear(project.dates.endedAt) : ''}</>}
                {project.dates.offAndOn && <span className="small font-weight-bold"> (off and on)</span>}
              </strong>
              <div className="o-grid u-mb">
                {project.tags.map(tag => <div key={tag.slug} className={`c-tag${isTagActive(tag) ? ' c-tag--active' : ''} u-m--xs`}>{tag.name}</div>)}
              </div>
              {project.description.map(paragraph => <p key={paragraph} className="u-small u-mt--none">{paragraph}</p>)}
              <div className="u-text-center">
                {project.client && <button type="button" className="c-button c-button--primary u-m--sm" onClick={() => setClient(project.client)}>client details</button>}
                {project.links && Object.keys(project.links).map(linkKey =>
                  <a key={linkKey} href={project.links[linkKey]} target="_blank" rel="noreferrer" className="c-button c-button--primary u-m--sm">{linkKey}</a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {client && <ClientModal client={client} onDismiss={() => setClient(undefined)} />}
    </>
  );
};

export default Projects;
