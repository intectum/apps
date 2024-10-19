import { NextPage } from 'next';

import { getClients, getProjects, getSkills } from '../common/data';
import Boids from '../components/home/Boids';
import Clients from '../components/home/Clients';
import Contact from '../components/home/Contact';
import Intro from '../components/home/Intro';
import Projects from '../components/home/Projects';
import Skills from '../components/home/Skills';
import Title from '../components/home/Title';
import ScrollAnimationContainer from '../components/ScrollAnimationContainer';

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
