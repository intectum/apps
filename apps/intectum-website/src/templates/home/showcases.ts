import { classes } from 'apps-web';

import projects from '../../data/projects';
import renderCarouselHTML from '../carousel';

const showcases = projects.filter(project => project.name === 'astrum' || project.name === 'ludo');

const renderShowcasesHTML = () => `
  <div data-section="scroll-animation" class="c-home-showcases u-container u-fc u-gap u-center">
    <h2>Showcases</h2>
    ${renderCarouselHTML(showcases.map((showcase, index) => `
      <h3 class="u-text-center">${showcase.name}</h3>
      <div class="${classes([ 'c-home-showcase__body', !!(index % 2) && 'c-home-showcase__body--reversed' ])}">
        <img class="c-home-showcase__body__background" src="${showcase.imageUrl}" alt="${showcase.name}" loading="lazy" />
        <div class="u-scroll-animation c-home-showcase__body__info-1 u-panel--middle u-fc u-gap">
          <div>
            Inspired by <Link href="https://www.youtube.com/playlist?list=PLFt_AvWsXl0ehjAfLFsp1PGaatzAwo0uK">Sebastian Lague’s Coding Adventures</Link>; this is a navigable, procedurally generated 3D solar system with orbital mechanics. It uses my 'ludo' game engine.
          </div>
          <div>
            More...
          </div>
        </div>
        <div class="u-scroll-animation c-home-showcase__body__info-2 u-panel--middle u-fc u-gap u-show-lg">
          <h4>Highlights</h4>
          <ul>
            <li>OpenGL/GLFW renderer.</li>
            <li>STB, Assimp and Bullet physics integrations.</li>
            <li>Dynamic world coordinates to prevent floating point inaccuracy at large coordinates.</li>
            <li>Multi-body gravitational system relative to the closest planet/moon to allow reliable physics.</li>
            <li>Streamed planet/moon terrain chunks and trees etc.</li>
            <li>Morphing LODs to prevent popping.</li>
            <li>Animated character that can run on the planets/moons and fly between them in a spaceship.</li>
            <li>Atmosphere and bloom post-processing effects.</li>
          </ul>
        </div>
      </div>
    `))}
    </Carousel>
  </div>
`;

export default renderShowcasesHTML;
