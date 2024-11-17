import { mapToHTML } from 'apps-web';

import { Project } from '../../common/types';

const renderProjectsGridHTML = (projects: Project[]) => `
  <div class="c-home-projects__grid u-f1">
    ${mapToHTML(projects, project => `
      <button
        type="button"
        class="c-button c-home-projects__grid-item u-p--none"
        style="background-image: url(${project.imageUrl})"
        data-action="open-project"
        data-project-slug="${project.slug}"
      ></button>
    `)}
  </div>
`;

export default renderProjectsGridHTML;
