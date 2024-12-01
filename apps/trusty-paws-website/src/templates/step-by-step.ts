import { mapToHTML } from 'apps-web';

import { StepByStep } from '../graphql/types';
import renderIconHTML, { Icon } from './icons';

const renderStepByStepHTML = (stepByStep: StepByStep) => `
  <div class="u-py--xl">
    <div class="u-container u-fc u-gap">
      <h2>${stepByStep.title}</h2>
      <div>${stepByStep.description}</div>
      <div class="c-timeline">
        ${mapToHTML(stepByStep.stepsCollection?.items, step => `
          <div class="c-timeline__stop">
            ${step?.image ? `<img class="c-timeline__image" src="${step.image.url}" alt="${step.image.title}" />` : ''}
            ${step?.icon ? renderIconHTML(step.icon as Icon, undefined, 'c-timeline__image') : ''}
            <div class="c-timeline__line">
              <div class="c-timeline__line-before"></div>
              <div class="c-timeline__line-point"></div>
              <div class="c-timeline__line-after"></div>
            </div>
            <div class="c-timeline__detail">
              <h3>${step?.title}</h3>
              <div>${step?.description}</div>
            </div>
          </div>
        `)}
      </div>
    </div>
  </div>
`;

export default renderStepByStepHTML;
