import { Testimonial } from '../graphql/types';
import renderIconHTML from './icons';

const renderTestimonialHTML = (testimonial: Testimonial) =>
{
  const linkHtml = testimonial.link ?
    `<a is="basis-a" class="u-light" href="${testimonial.link}">
      ${renderIconHTML('arrow-up-right-from-square')}
    </a>` : '';

  return `
    <div class="c-testimonial u-fc u-gap u-p">
      <div class="u-fr u-gap--xs">
        ${renderIconHTML('star')}
        ${renderIconHTML('star')}
        ${renderIconHTML('star')}
        ${renderIconHTML('star')}
        ${renderIconHTML('star')}
      </div>
      <blockquote>${testimonial.content}</blockquote>
      <div class="u-fr u-gap u-justify--space-between u-align--center">
        <div>- ${testimonial.author}</div>
        ${linkHtml}
      </div>
    </div>
  `;
};

export default renderTestimonialHTML;
