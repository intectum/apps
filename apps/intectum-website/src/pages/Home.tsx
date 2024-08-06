import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getClients, getTags } from '../common/data';
import { Client, cvUrl, Tag } from '../common/types';
import ClientModal from '../components/ClientModal';

const Freelance: FC = () =>
{
  const [ client, setClient ] = useState<Client>();
  const [ clients, setClients ] = useState<Client[]>();
  const [ tags, setTags ] = useState<Tag[]>();

  useEffect(() =>
  {
    getClients().then(setClients);
    getTags().then(setTags);
  }, []);

  const activeClients = clients?.filter(client => client.active).sort((a, b) => a.name.localeCompare(b.name));
  const experienceTags = tags?.filter(tag => tag.active && tag.type === 'experience').sort((a, b) => a.name.localeCompare(b.name));
  const toolTags = tags?.filter(tag => tag.active && tag.type === 'tool').sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="o-container">
        <section className="u-my--lg">
          <h1><span className="u-color--primary">freelance</span> senior developer</h1>
          <h2 className="u-color--primary">Hello! My name is Gyan (aka Gary Buyn)</h2>
          <div className="u-text-center">
            <a href="https://www.linkedin.com/in/intectum" target="_blank" rel="noreferrer" className="c-button c-button--primary u-m--sm">LinkedIn</a>
            <a href={cvUrl} target="_blank" rel="noreferrer" className="c-button c-button--primary u-m--sm">Full CV</a>
            <a href="https://github.com/gyan-intectum-nz" target="_blank" rel="noreferrer" className="c-button c-button--primary u-m--sm">GitHub</a>
            <a href="mailto:gyan@intectum.nz" className="c-button c-button--primary u-m--sm">gyan@intectum.nz</a>
          </div>
        </section>
        <div className="u-p"/>
        <section className="u-my--lg">
          <div className="o-columns-3">
            <div className="u-mx u-text-center">
              <img src="/images/code.png" alt="Code"/>
              <h3 className="u-color--primary">I have a passion for high quality code that is as simple as
                possible.</h3>
            </div>
            <div className="u-mx u-text-center">
              <img src="/images/learn.png" alt="Learn"/>
              <h3 className="u-color--primary">I learn new tech and concepts very quickly.</h3>
            </div>
            <div className="u-mx u-text-center">
              <img src="/images/details.png" alt="Details"/>
              <h3 className="u-color--primary">I pay a lot of attention to the details.</h3>
            </div>
          </div>
          <div className="o-columns-3">
            <p className="u-mx u-my--none u-large">
              In my experience the number one cause of bugs and hard to maintain software is
              complexity. Writing simpler code that does the same job makes it easier for other developers to
              understand, reduces the chance for bugs, makes it easier to change later on and often even improves
              performance.
            </p>
            <p className="u-mx u-my--none u-large">
              I often jump into existing code-bases which almost inevitably use something that I
              have no previous experience with. I approach the new code-base task by task, determining how much needs
              to be learned to effectively complete the task at hand without attempting to learn everything. This
              means that I can join a project and be effective straight away.
            </p>
            <p className="u-mx u-my--none u-large">
              Although I do not attempt to learn everything before performing a single task in a
              project, I will learn what I need to know to perform that task to a high standard. Not just to get it
              done but to get it done well. I always try to find the canonical method and use the strengths of the
              project, languages and technologies. I will also look for weaknesses in the project and suggest
              improvements.
            </p>
          </div>
        </section>
        <div className="u-p"/>
        <section className="u-my--lg">
          <h2>Experience</h2>
          <div className="o-grid">
            {experienceTags?.map(tag =>
              <Link key={tag.slug} className="u-text-center u-m" to={`/projects?tag=${tag.slug}`}>
                <img className="c-icon" src={tag.iconUrl} alt={tag.name}/>
                <h4>{tag.name}</h4>
              </Link>
            )}
          </div>
        </section>
        <div className="u-p"/>
        <section className="u-my--lg">
          <h2>Vetted Engineer at</h2>
          <div className="o-grid">
            <a href="https://arc.dev/@premgyan" target="_blank" rel="noreferrer" className="u-text-center u-m">
              <img className="c-icon" src="images/arc-dev.svg" alt="arc()"/>
            </a>
          </div>
        </section>
        <div className="u-p"/>
        <section className="u-my--lg">
          <h2>Clients</h2>
          <div className="o-grid">
            {activeClients?.map(client =>
              <button key={client.slug} className="c-button" onClick={() => setClient(client)}>
                <img className="c-icon" src={client.iconUrl} alt={client.name}/>
              </button>
            )}
          </div>
        </section>
        <div className="u-p"/>
        <section className="u-my--lg">
          <h2>Tools of the Trade</h2>
          <div className="o-grid">
            {toolTags?.map(tag =>
              <Link key={tag.slug} className="u-m" to={`/projects?tag=${tag.slug}`}>
                <img className="icon" src={tag.iconUrl} alt={tag.name}/>
              </Link>
            )}
          </div>
        </section>
      </div>
      {client && <ClientModal client={client} onDismiss={() => setClient(undefined)}/>}
    </>
  );
};

export default Freelance;
