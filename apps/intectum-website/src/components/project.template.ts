import { Project } from '../common/types';

const renderProjectHTML = (project: Project, index: number) => `
  <button
    type="button"
    class="c-button c-project-grid__preview u-panel--invert u-fr u-p--none"
    style="--project-index: ${index};"
    data-name="project"
    data-project-slug="${project.slug}"
  >
    <img
      class="u-f1"
      src="${project.imageUrl}"
      alt="${project.name}"
      loading="lazy"
    />
  </button>
`;

export default renderProjectHTML;
