import { mapToHTML } from 'based';

import { Project } from '../common/types';
import projects from '../data/projects';

const renderProjectsHTML = () => `
  <div data-scroll-animation="" data-name="projects" class="c-home-projects u-container">
    <div class="c-home-projects__body u-fr u-center">
      <div class="c-home-projects__detail u-fc u-gap u-text-center u-m">
        <h2>Projects</h2>
        <div class="u-text-large">60+ and counting</div>
        <div>Check out all of my <a href="/projects">projects</a></div>
      </div>
      <div class="c-home-projects__catalog u-scroll-animation u-m" style="--page-count: 3">
        ${renderProjectsPageHTML(0, coverHTML, renderProjectsGridHTML(projects.slice(0, 10)))}
        ${renderProjectsPageHTML(1, renderProjectsGridHTML(projects.slice(10, 20)), renderProjectsGridHTML(projects.slice(20, 30)))}
        ${renderProjectsPageHTML(2, renderProjectsGridHTML(projects.slice(30, 40)), backHTML)}
      </div>
    </div>
  </div>
`;

const coverHTML = `
  <div class="u-fr u-center u-f1">
    <h3>Catalog</h3>
  </div>
`;

const renderProjectsPageHTML = (index: number, frontHTML: string, backHTML: string) => `
  <div
    class="c-home-projects__page u-scroll-animation"
    style="--page-index: ${index};"
  >
    <div class="c-home-projects__page-side c-home-projects__page-side--front u-panel--invert">
      ${frontHTML}
    </div>
    <div class="c-home-projects__page-side c-home-projects__page-side--back u-panel--invert u-scroll-animation">
      ${backHTML}
    </div>
  </div>
`;

const renderProjectsGridHTML = (projects: Project[]) => `
  <div class="c-home-projects__grid u-f1">
    ${mapToHTML(projects, project => `
      <button
        type="button"
        class="c-button c-home-projects__grid-item u-p--none"
        title="${project.name}"
        data-name="project"
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

const backHTML = `
  <div class="u-fr u-center u-f1">
    <div>to be continued...</div>
  </div>
`;

export default renderProjectsHTML;
