import { NextPage } from 'next';

import { getClients, getProjects, getSkills } from '../common/data';
import ScrollAnimationContainer from '../components/ScrollAnimationContainer';
import Boids from './Boids';
import Clients from './Clients';
import Contact from './Contact';
import Intro from './Intro';
import Projects from './Projects';
import Skills from './Skills';
import Title from './Title';

const Home: NextPage = async () =>
{
  const [ clients, projects, skills ] = await Promise.all([ getClients(), getProjects(), getSkills() ]);

  return (
    <>
      <ScrollAnimationContainer>
        <Title />
      </ScrollAnimationContainer>
      <ScrollAnimationContainer>
        <Intro />
      </ScrollAnimationContainer>
      <Skills skills={skills} />
      <ScrollAnimationContainer>
        <Clients clients={clients} />
      </ScrollAnimationContainer>
      {/*
      <Testimonials />
      */}
      <ScrollAnimationContainer>
        <Projects projects={projects} />
      </ScrollAnimationContainer>
      {/*
      <ScrollAnimationContainer>
        <Showcases showcases={projects.filter(project => project.name === 'astrum' || project.name === 'ludo')} />
      </ScrollAnimationContainer>
      */}
      <Contact />
      <ScrollAnimationContainer>
        <Boids />
      </ScrollAnimationContainer>
    </>
  );
};

export default Home;
