import { mapToHTML } from 'apps-web';

import renderAnglesDownSvg from '../icons/angles-down';

const renderTitleHTML = () => `
  <div data-section="scroll-animation" class="c-home-title u-container u-fc u-align--center u-p">
    <div class="u-fc u-f1 u-center">
      <div class="c-home-title__welcome u-text-large">welcome to</div>
      <h1 class="c-home-title__intectum u-scroll-animation">
        ${mapToHTML(Array.from('intectum'), (char, index) => `
          <span class="c-home-title__intectum__char c-home-title__intectum__char-${index} u-scroll-animation">
            ${char}
          </span>
        `)}
      </h1>
    </div>
    <div class="c-home-title__scroll-icon u-scroll-animation">
      <div class="c-home-title__scroll-icon__bobbing">
        ${renderAnglesDownSvg()}
      </div>
    </div>
  </div>
`;

export default renderTitleHTML;
