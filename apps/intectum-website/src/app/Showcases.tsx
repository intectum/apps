import { FC, Fragment } from 'react';

import { classes, Link, Panel } from 'apps-web';

import { Project } from '../common/types';
import Carousel from '../components/Carousel';

type Props =
{
  showcases: Project[];
};

const Showcases: FC<Props> = ({ showcases }) =>
  <div className="o-container o-column c-home-showcases u-center">
    <h2>Showcases</h2>
    <Carousel>
      {showcases.map((showcase, index) =>
        <Fragment key={index}>
          <h3 className="u-text-center">{showcase.name}</h3>
          <div
            className={classes([ 'c-home-showcase__body', !!(index % 2) && 'c-home-showcase__body--reversed' ])}
            style={{ backgroundImage: `url(${showcase.imageUrl})` }}
          >
            <Panel shade="middle" className="o-column o-scroll-animation c-home-showcase__body__info-1">
              <div>
                Inspired by <Link href="https://www.youtube.com/playlist?list=PLFt_AvWsXl0ehjAfLFsp1PGaatzAwo0uK">Sebastian Lague’s Coding Adventures</Link>; this is a navigable, procedurally generated 3D solar system with orbital mechanics. It uses my 'ludo' game engine.
              </div>
              <div>
                More...
              </div>
            </Panel>
            <Panel shade="middle" className="o-column o-scroll-animation c-home-showcase__body__info-2 u-large-up">
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
            </Panel>
          </div>
        </Fragment>
      )}
    </Carousel>
  </div>;

export default Showcases;
