import { mapToHTML } from 'apps-web';

const renderTitleHTML = () => `
  <div data-section="scroll-animation" class="c-home-title u-container u-fc u-center u-text-center">
    <div class="c-home-title__welcome u-text-large">Welcome to</div>
    <h1 class="c-home-title__intectum u-scroll-animation">
      ${mapToHTML(Array.from('intectum'), (char, index) => `
        <span class="c-home-title__intectum__char c-home-title__intectum__char-${index} u-scroll-animation">
          ${char}
        </span>
      `)}
    </h1>
    <div class="c-home-title__scroll-icon u-scroll-animation">
      <div class="c-home-title__scroll-icon__bobbing">
        <i class="fa-solid fa-angles-down u-icon--lg"></i>
      </div>
    </div>
  </div>
`;

export default renderTitleHTML;
