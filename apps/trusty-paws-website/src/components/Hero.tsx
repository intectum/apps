import { FC } from 'react';

import { classes, Panel } from 'apps-web';

import RichText from '../components/RichText';
import { Hero as HeroType } from '../graphql/types';

type Props =
{
  hero: HeroType;
};

const Hero: FC<Props> = ({ hero }) =>
{
  return (
    <Panel theme={hero.theme ?? undefined} className="u-py--xl">
      <div className={classes([ 'u-container', hero.imageOnLeft ? 'u-fr--reversed' : 'u-fr', 'u-gap--xl' ])}>
        <div className="u-fc u-gap u-justify--center u-f1">
          <h1>{hero.title}</h1>
          {hero.content &&
            <RichText document={hero.content.json} />
          }
        </div>
        <div className="u-f1">
          {hero.image?.url &&
            <img
              className="u-aspect--1"
              src={hero.image.url}
              alt={hero.image.title ?? undefined}
            />
          }
        </div>
      </div>
    </Panel>
  );
};

export default Hero;
