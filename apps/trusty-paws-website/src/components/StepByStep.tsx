import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import { Icon } from 'apps-web';

import { StepByStep as StepByStepType } from '../graphql/types';

type Props =
{
  stepByStep: StepByStepType;
};

const StepByStep: FC<Props> = ({ stepByStep }) =>
  <div className="u-py--xl">
    <div className="o-container o-column">
      <h2>{stepByStep.title}</h2>
      <div>{stepByStep.description}</div>
      <div className="c-timeline">
        {stepByStep.stepsCollection?.items.map(step =>
          <div key={step?.sys.id} className="c-timeline__stop">
            {step?.image?.url &&
              <img className="c-timeline__image" src={step.image.url} alt={step.image.title ?? undefined} />
            }
            {step?.icon &&
              <Icon className="c-timeline__image" icon={step?.icon.split(' ') as FontAwesomeIconProps['icon']} />
            }
            <div className="c-timeline__line">
              <div className="c-timeline__line-before"/>
              <div className="c-timeline__line-point"/>
              <div className="c-timeline__line-after"/>
            </div>
            <div className="c-timeline__detail">
              <h3>{step?.title}</h3>
              <div>{step?.description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>;

export default StepByStep;
