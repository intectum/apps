import { mapToHTML } from 'apps-web';

import { Project } from '../../common/types';

const renderProjectsGridHTML = (projects: Project[]) => `
  <div class="c-home-projects__grid u-f1">
    ${mapToHTML(projects, project => `
      <button
        type="button"
        class="c-button c-home-projects__grid-item u-p--none"
        title="${project.name}"
        data-action="open-project"
        data-project-slug="${project.slug}"
      >
        <img
          class="c-home-projects__grid-image"
          src="${project.imageUrl}"
          alt="${project.name}"
          loading="lazy"
        />
      </button>
    `)}
  </div>
`;

export default renderProjectsGridHTML;
