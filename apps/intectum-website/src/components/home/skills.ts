import { replaceSelector } from 'apps-web';

import renderSkillsCategoryHTML from '../../templates/home/skills-category';

const skillObserver = new IntersectionObserver(entries =>
{
  for (const entry of entries)
  {
    entry.target.classList.toggle('c-home-skills__skill-bar-filled--animated', entry.isIntersecting);
  }
});

export class Skills extends HTMLDivElement
{
  connectedCallback()
  {
    this.setCategory('lang');

    const setCategoryAll = this.querySelectorAll<HTMLButtonElement>('[data-action="set-category"]');
    for (const setCategory of setCategoryAll)
    {
      setCategory.onclick = () => this.setCategory(setCategory.getAttribute('data-category') ?? '');
    }
  }

  setCategory(category: string)
  {
    const skillBarFilledAll = this.querySelectorAll('[data-section="skill-bar-filled"]');
    for (const skillBarFilled of skillBarFilledAll)
    {
      skillObserver.unobserve(skillBarFilled);
    }

    const skillsMatrix = this.querySelector('[data-section="skills-matrix"]');
    if (skillsMatrix)
    {
      replaceSelector(skillsMatrix, '[data-section="skill"]', renderSkillsCategoryHTML(category));
    }

    const newSkillBarFilledAll = this.querySelectorAll('[data-section="skill-bar-filled"]');
    for (const newSkillBarFilled of newSkillBarFilledAll)
    {
      skillObserver.observe(newSkillBarFilled);
    }

    const setCategoryAll = this.querySelectorAll<HTMLButtonElement>('[data-action="set-category"]');
    for (const setCategory of setCategoryAll)
    {
      const isActiveCategory = setCategory.getAttribute('data-category') === category;
      setCategory.classList.toggle('u-panel--accent', isActiveCategory);
      setCategory.classList.toggle('u-panel', !isActiveCategory);
    }
  }
}

export const defineHomeSkills = () =>
  customElements.define('intectum-home-skills', Skills, { extends: 'div' });
