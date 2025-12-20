import { init, toElements } from 'based/client';

import { renderSkillsCategoryHTML } from './skills.template';

const skillObserver = new IntersectionObserver(entries =>
{
  for (const entry of entries)
  {
    entry.target.classList.toggle('c-home-skills__skill-bar-filled--animated', entry.isIntersecting);
  }
});

init['[data-name="skills"]'] = element =>
{
  const setCategory = (category: string) =>
  {
    const skillBarFilledAll = element.querySelectorAll('[data-name="skill-bar-filled"]');
    for (const skillBarFilled of skillBarFilledAll)
    {
      skillObserver.unobserve(skillBarFilled);
    }

    const skillsMatrix = element.querySelector('[data-name="skills-matrix"]');
    if (skillsMatrix)
    {
      while (skillsMatrix.lastElementChild && (skillsMatrix.lastElementChild as HTMLElement).dataset.name === 'skill')
      {
        skillsMatrix.removeChild(skillsMatrix.lastElementChild);
      }

      const skills = toElements(renderSkillsCategoryHTML(category));
      for (const skill of skills)
      {
        skillsMatrix.appendChild(skill);
      }
    }

    const newSkillBarFilledAll = element.querySelectorAll('[data-name="skill-bar-filled"]');
    for (const newSkillBarFilled of newSkillBarFilledAll)
    {
      skillObserver.observe(newSkillBarFilled);
    }

    const setCategoryAll = element.querySelectorAll<HTMLButtonElement>('[data-name="category"]');
    for (const setCategory of setCategoryAll)
    {
      const isActiveCategory = setCategory.dataset.category === category;
      setCategory.classList.toggle('u-panel--accent', isActiveCategory);
      setCategory.classList.toggle('u-panel', !isActiveCategory);
    }
  };

  setCategory('lang');

  const categoryAll = element.querySelectorAll<HTMLButtonElement>('[data-name="category"]');
  for (const category of categoryAll)
  {
    category.onclick = () => setCategory(category.dataset.category ?? '');
  }
};
