import { Asset, StepByStep } from '../graphql/types';

const createStepByStepElement = (stepByStep: StepByStep) =>
{
  const stepImageHtml = (image: Asset) =>
    `<img class="c-timeline__image" src="${image.url}" alt="${image.title}" />`;

  const stepIconHtml = (icon: string) =>
    `<i class="c-timeline__image ${icon} fa-8x"></i>`;

  const html = `
    <div class="u-py--xl">
      <div class="u-container u-fc u-gap">
        <h2>${stepByStep.title}</h2>
        <div>${stepByStep.description}</div>
        <div class="c-timeline">
          ${stepByStep.stepsCollection?.items.map(step => `
            <div class="c-timeline__stop">
              ${step?.image ? stepImageHtml(step.image) : ''}
              ${step?.icon ? stepIconHtml(step.icon) : ''}
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
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;

  return container.firstElementChild as HTMLDivElement;
};

export default createStepByStepElement;
