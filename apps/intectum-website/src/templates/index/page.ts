import renderBoidsHTML from './boids';
import renderClientsHTML from './clients';
import renderContactHTML from './contact';
import renderIntroHTML from './intro';
import renderProjectsHTML from './projects';
import renderSkillsHTML from './skills';
import renderTitleHTML from './title';

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
