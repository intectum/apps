import { CallToAction } from '../graphql/types';

const renderCallToActionHTML = (callToAction: CallToAction) =>
  callToAction.description ? renderCallToActionRegularHTML(callToAction) : renderCallToActionCompactHTML(callToAction);

const renderCallToActionCompactHTML = (callToAction: CallToAction) => `
  <div class="c-call-to-action--compact u-fr u-justify--center">
    <a is="basis-a" class="c-button c-button--large u-theme--main-inverted" href="${callToAction.link}">
      ${callToAction.linkLabel}
    </a>
  </div>
`;

const renderCallToActionRegularHTML = (callToAction: CallToAction) => `
  <div class="u-theme--blue u-py--xl">
    <div class="u-container u-fc u-gap">
      <h2>${callToAction.title}</h2>
      <div>${callToAction.description}</div>
      <div class="u-fr u-justify--center">
        <a is="basis-a" class="u-theme--blue-inverted u-py--xl" href="${callToAction.link}">
          ${callToAction.linkLabel}
        </a>
      </div>
    </div>
  </div>
`;

export default renderCallToActionHTML;
