import renderBoidsHTML from '../components/boids.template';
import renderClientsHTML from '../components/clients.template';
import renderContactHTML from '../components/contact.template';
import renderIntroHTML from '../components/intro.template';
import renderProjectsHTML from '../components/projects.template';
import renderSkillsHTML from '../components/skills.template';
import renderTitleHTML from '../components/title.template';

const renderPageHTML = () => `
  ${renderTitleHTML()}
  ${renderIntroHTML()}
  ${renderSkillsHTML()}
  ${renderClientsHTML()}
  <!--renderTestimonialsHTML()-->
  ${renderProjectsHTML()}
  <!--renderShowcasesHTML()-->
  ${renderContactHTML()}
  ${renderBoidsHTML()}
`;

export default renderPageHTML;
