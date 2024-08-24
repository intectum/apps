import { FC } from 'react';

interface Props
{
  title: string;
  heroSrc: string;
}

const Showcase: FC<Props> = ({ title, heroSrc }) =>
  <>
    <h2 className="u-text-center">showcase // {title}</h2>
    <div className="c-home-showcase__body" style={{ backgroundImage: `url(${heroSrc})` }}>
      <div className="o-scroll-animation c-home-showcase__body__info-1 u-flex u-flex--column u-flex--spaced">
        <div>
          Inspired by <a href="https://www.youtube.com/playlist?list=PLFt_AvWsXl0ehjAfLFsp1PGaatzAwo0uK" target="_blank" referrerPolicy="no-referrer">Sebastian Lague’s Coding Adventures</a>; this is a navigable, procedurally generated 3D solar system with orbital mechanics. The project aims to be a simple, procedural, performant, and data-oriented demonstration. It does not use a 3rd party game engine.
        </div>
        <div>
          More...
        </div>
      </div>
      <div className="o-scroll-animation c-home-showcase__body__info-2 u-flex u-flex--column u-flex--spaced u-large">
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
  </>;

export default Showcase;
