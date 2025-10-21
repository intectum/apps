import projects from '../../data/projects';
import renderProjectsPageHTML from './projects-page';
import renderProjectsGridHTML from './projects-grid';

const renderProjectsHTML = () => `
  <div data-name="scroll-animation" is="intectum-home-projects" class="c-home-projects u-container">
    <div class="c-home-projects__body u-fr u-center">
      <div class="c-home-projects__detail u-fc u-gap u-text-center u-m">
        <h2>Projects</h2>
        <div class="u-text-large">60+ and counting</div>
        <div>Check out all of my <a is="basis-a" href="/projects">projects</a></div>
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

const backHTML = `
  <div class="u-fr u-center u-f1">
    <div>to be continued...</div>
  </div>
`;

export default renderProjectsHTML;
