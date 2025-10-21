import renderLockSvg from '../icons/lock';
import renderTriangleExclamationSvg from '../icons/triangle-exclamation';

const renderBoidsHTML = () => `
  <div data-name="scroll-animation" is="intectum-home-boids" class="c-boids">
    <div class="c-boids__wave c-boids__wave--1 u-scroll-animation"></div>
    <div class="c-boids__wave c-boids__wave--2 u-scroll-animation"></div>
    <div class="c-boids__warning u-panel--invert u-fr u-center u-rounded u-hide-md u-px u-py--sm">
      ${renderTriangleExclamationSvg('u-mr--sm')}
      Please do not tap the glass
    </div>
    <div class="c-boids__shark-lock u-panel--invert u-fr u-align--center">
      <div class="u-ml u-mr--sm u-show-md">DANGER: Do not unlock!</div>
      <button type="button" class="c-button c-circle u-panel--invert" title="Do not unlock!" data-action="unlock-shark">
        ${renderLockSvg()}
      </button>
    </div>
  </div>
`;

export default renderBoidsHTML;
