import renderSkillsCategoryHTML from './skills-category';

const renderSkillsHTML = () => `
  <div is="intectum-home-skills" class="c-home-skills u-container u-fr u-center">
    <div class="c-home-skills__detail u-fc u-gap u-text-center u-m">
      <h2>Toolbox</h2>
      <div class="u-text-large">I have a passion for high quality code that is as simple as possible, learn new tech and concepts very quickly and pay a lot of attention to the details</div>
    </div>
    <div data-section="skills-matrix" class="c-home-skills__matrix u-fc u-gap u-center u-m">
      <div class="u-center u-fr u-gap u-wrap">
        <button
          type="button"
          class="c-button u-panel--accent u-rounded"
          data-action="set-category"
          data-category="lang"
        >
          Languages
        </button>
        <button
          type="button"
          class="c-button u-panel u-rounded"
          data-action="set-category"
          data-category="front"
        >
          Front End
        </button>
        <button
          type="button"
          class="c-button u-panel u-rounded"
          data-action="set-category"
          data-category="back"
        >
          Back End
        </button>
        <button
          type="button"
          class="c-button u-panel u-rounded"
          data-action="set-category"
          data-category="other"
        >
          Other
        </button>
      </div>
      ${renderSkillsCategoryHTML('lang')}
    </div>
  </div>
`;

export default renderSkillsHTML;
