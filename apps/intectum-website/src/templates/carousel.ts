import { mapToHTML } from 'apps-web';

const renderCarouselHTML = (slideHTMLAll: string[]) => `
  <div is="intectum-carousel" class="c-carousel">
    <div class="c-carousel__track">
      ${mapToHTML(slideHTMLAll, (slideHTML, index) => `
        <div
          class="c-carousel__slide"
          style="
            position: ${index ? 'absolute' : undefined};
            left: ${index ? `${index * 100}%` : undefined};
            top: ${index ? 0 : undefined};
            width: ${index ? '100%' : undefined};
          "
        >
          ${slideHTML}
        </div>
      `)}
    </div>
    <div class="c-carousel__blur c-carousel__blur--left"></div>
    <div class="c-carousel__blur c-carousel__blur--right"></div>
    <button
      type="button"
      class="c-button c-circle c-carousel__shift c-carousel__shift--previous u-panel--invert"
      data-action="decrement-index"
    >
      <i class="fa-solid fa-angle-left u-icon"></i>
    </button>
    <button
      type="button"
      class="c-button c-circle c-carousel__shift c-carousel__shift--next u-panel--invert"
      data-action="increment-index"
    >
      <i class="fa-solid fa-angle-right u-icon"></i>
    </button>
    <div class="u-fr u-gap u-center u-m">
      ${mapToHTML(Array.from(Array(slideHTMLAll.length)), () => `
        <button
          type="button"
          class="c-button c-circle c-carousel__jump u-panel--middle"
          data-action="set-current-index"
        />
      `)}
    </div>
  </div>
`;

export default renderCarouselHTML;