import { Testimonial } from '../graphql/types';

const createTestimonialElement = (testimonial: Testimonial) =>
{
  const linkHtml = testimonial.link ?
    `<a is="basis-a" class="u-light" href="${testimonial.link}">
      <i class="fa-solid fa-arrow-up-right-from-square fa-xs"></i>
    </a>` : '';

  const html = `
    <div class="c-testimonial u-fc u-gap u-p">
      <div class="u-fr u-gap--xs">
        <i class="fa-solid fa-star fa-xs"></i>
        <i class="fa-solid fa-star fa-xs"></i>
        <i class="fa-solid fa-star fa-xs"></i>
        <i class="fa-solid fa-star fa-xs"></i>
        <i class="fa-solid fa-star fa-xs"></i>
      </div>
      <blockquote>${testimonial.content}</blockquote>
      <div class="u-fr u-gap u-justify--space-between u-align--center">
        <div>- ${testimonial.author}</div>
        ${linkHtml}
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;

  return container.firstElementChild as HTMLDivElement;
};

export default createTestimonialElement;
