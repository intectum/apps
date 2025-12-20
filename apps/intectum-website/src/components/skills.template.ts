import { mapToHTML } from 'based';

import { SkillCategory } from '../common/types';
import skills from '../data/skills';

const goodEnoughSkills = skills.filter(skill => skill.proficiency > 1);

const skillCounts = goodEnoughSkills
  .reduce<Partial<Record<SkillCategory, number>>>((previousValue, currentValue) =>
    ({
      ...previousValue,
      [currentValue.category]: (previousValue[currentValue.category] ?? 0) + 1
    }), {});

const maxSkillCount = Object.values(skillCounts)
  .reduce((previousValue, currentValue) => Math.max(previousValue, currentValue), 0);

const renderSkillsHTML = () => `
  <div data-name="skills" class="c-home-skills u-container u-fr u-center">
    <div class="c-home-skills__detail u-fc u-gap u-text-center u-m">
      <h2>Toolbox</h2>
      <div class="u-text-large">I have a passion for high quality code that is as simple as possible, learn new tech and concepts very quickly and pay a lot of attention to the details</div>
    </div>
    <div data-name="skills-matrix" class="c-home-skills__matrix u-fc u-gap u-center u-m">
      <div class="u-center u-fr u-gap u-wrap">
        <button
          type="button"
          class="c-button u-panel--accent u-rounded"
          data-name="category"
          data-category="lang"
        >
          Languages
        </button>
        <button
          type="button"
          class="c-button u-panel u-rounded"
          data-name="category"
          data-category="front"
        >
          Front End
        </button>
        <button
          type="button"
          class="c-button u-panel u-rounded"
          data-name="category"
          data-category="back"
        >
          Back End
        </button>
        <button
          type="button"
          class="c-button u-panel u-rounded"
          data-name="category"
          data-category="other"
        >
          Other
        </button>
      </div>
    </div>
  </div>
`;

export const renderSkillsCategoryHTML = (category: string) =>
{
  const skillsInCategory = goodEnoughSkills
    .filter(skill => skill.category === category)
    .sort((a, b) => b.proficiency - a.proficiency);

  return `
    ${mapToHTML(skillsInCategory, skill => `
      <div data-name="skill" class="c-home-skills__skill u-fr">
        <div class="c-home-skills__skill-name u-panel--invert u-p--xs">${skill.name}</div>
        <div
          class="c-home-skills__skill-bar u-panel--middle u-f1"
          style="--skill-proficiency: ${skill.proficiency};"
        >
          <div data-name="skill-bar-filled" class="c-home-skills__skill-bar-filled u-panel--accent"></div>
        </div>
      </div>
    `)}
    ${mapToHTML(Array.from(Array(maxSkillCount - skillsInCategory.length)), () => `
      <div data-name="skill" class="c-home-skills__skill"></div>
    `)}
  `;
};

export default renderSkillsHTML;
