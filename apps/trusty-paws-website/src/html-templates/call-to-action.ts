import { CallToAction } from '../graphql/types';

const createCallToActionElement = (callToAction: CallToAction) =>
{
  const html = !callToAction.description
    ?
    `<div class="c-call-to-action--compact u-fr u-justify--center">
      <a is="basis-a" class="c-button c-button--large u-theme--main-inverted" href="${callToAction.link}">
        ${callToAction.linkLabel}
      </a>
    </div>`
    :
    `<div class="u-theme--blue u-py--xl">
      <div class="u-container u-fc u-gap">
        <h2>${callToAction.title}</h2>
        <div>${callToAction.description}</div>
        <div class="u-fr u-justify--center">
          <a is="basis-a" class="u-theme--blue-inverted u-py--xl" href="${callToAction.link}">
            ${callToAction.linkLabel}
          </a>
        </div>
      </div>
    </div>`;

  const container = document.createElement('div');
  container.innerHTML = html;

  return container.firstElementChild as HTMLDivElement;
};

export default createCallToActionElement;
