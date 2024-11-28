import { mapToHTML } from 'apps-web';

import { SkillCategory } from '../../common/types';
import skills from '../../data/skills';

const goodEnoughSkills = skills.filter(skill => skill.proficiency > 1);

const skillCounts = goodEnoughSkills
  .reduce<Partial<Record<SkillCategory, number>>>((previousValue, currentValue) =>
    ({
      ...previousValue,
      [currentValue.category]: (previousValue[currentValue.category] ?? 0) + 1
    }), {});

const maxSkillCount = Object.values(skillCounts)
  .reduce((previousValue, currentValue) => Math.max(previousValue, currentValue), 0);

const renderSkillsCategoryHTML = (category: string) =>
{
  const skillsInCategory = goodEnoughSkills
    .filter(skill => skill.category === category)
    .sort((a, b) => b.proficiency - a.proficiency);

  return `
    ${mapToHTML(skillsInCategory, skill => `
      <div data-section="skill" class="c-home-skills__skill u-fr">
        <div class="c-home-skills__skill-name u-panel--invert u-p--xs">${skill.name}</div>
        <div
          class="c-home-skills__skill-bar u-panel--middle u-f1"
          style="--skill-proficiency: ${skill.proficiency};"
        >
          <div data-section="skill-bar-filled" class="c-home-skills__skill-bar-filled u-panel--accent"></div>
        </div>
      </div>
    `)}
    ${mapToHTML(Array.from(Array(maxSkillCount - skillsInCategory.length)), () => `
      <div data-section="skill" class="c-home-skills__skill"></div>
    `)}
  `;
};

export default renderSkillsCategoryHTML;
