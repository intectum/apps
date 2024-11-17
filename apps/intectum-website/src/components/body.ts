import renderBodyHTML from '../templates/body';
import renderBoidsHTML from '../templates/home/boids';
import renderClientsHTML from '../templates/home/clients';
import renderContactHTML from '../templates/home/contact';
import renderIntroHTML from '../templates/home/intro';
import renderProjectsHTML from '../templates/home/projects';
import renderSkillsHTML from '../templates/home/skills';
import renderTitleHTML from '../templates/home/title';
import { default as renderProjectsProjectsHTML } from '../templates/projects/projects';

class Body extends HTMLBodyElement
{
  connectedCallback()
  {
    this.render();

    window.addEventListener('pushstate', () => this.render());
    window.addEventListener('popstate', () => this.render());
  }

  render()
  {
    document.documentElement.scrollTop = 0;

    if (location.pathname === '/')
    {
      this.innerHTML = renderBodyHTML(`
      ${renderTitleHTML()}
      ${renderIntroHTML()}
      ${renderSkillsHTML()}
      ${renderClientsHTML()}
      <!--renderTestimonialsHTML()-->
      ${renderProjectsHTML()}
      <!--renderShowcasesHTML()-->
      ${renderContactHTML()}
      ${renderBoidsHTML()}
    `);
    }
    else if (location.pathname === '/projects')
    {
      this.innerHTML = renderBodyHTML(renderProjectsProjectsHTML());
    }
  }
}

customElements.define('intectum-body', Body, { extends: 'body' });
