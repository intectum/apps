import { FC, Fragment } from 'react';

import { Project } from '../common/types';
import Carousel from '../components/Carousel';
import { classes } from 'apps-web';

type Props =
{
  showcases: Project[];
};

const Showcases: FC<Props> = ({ showcases }) =>
{
  return (
    <div className="c-home-showcases u-flex u-flex--column u-flex--centered u-flex--spaced">
      <h2>Showcases</h2>
      <Carousel>
        {showcases.map((showcase, index) =>
          <Fragment key={index}>
            <h3 className="u-text-center">{showcase.name}</h3>
            <div
              className={classes([ 'c-home-showcase__body', !!(index % 2) && 'c-home-showcase__body--reversed' ])}
              style={{ backgroundImage: `url(${showcase.imageUrl})` }}
            >
              <div className="o-scroll-animation c-home-showcase__body__info-1 u-flex u-flex--column u-flex--spaced">
                <div>
                  Inspired by <a href="https://www.youtube.com/playlist?list=PLFt_AvWsXl0ehjAfLFsp1PGaatzAwo0uK" target="_blank" referrerPolicy="no-referrer">Sebastian Lague’s Coding Adventures</a>; this is a navigable, procedurally generated 3D solar system with orbital mechanics. It uses my 'ludo' game engine.
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
          </Fragment>
        )}
      </Carousel>
    </div>
  );
};

export default Showcases;
