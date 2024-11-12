import { Testimonials } from '../graphql/types';
import renderTestimonialHTML from './testimonial';

const renderTestimonialsHTML = (testimonials: Testimonials) =>
{
  const testimonialCount = testimonials.testimonialsCollection?.items.length ?? 0;
  const halfTestimonialCount = Math.ceil(testimonialCount / 2);

  const testimonialsLeft = testimonials.testimonialsCollection?.items
    .slice(0, halfTestimonialCount)
    .filter(testimonial => !!testimonial);

  const testimonialsRight = testimonials.testimonialsCollection?.items
    .slice(halfTestimonialCount)
    .filter(testimonial => !!testimonial);

  return `
    <div class="c-testimonials u-theme--blue u-py--xl">
      <div class="c-testimonials__content u-container u-fr u-gap u-align--center">
        <h2 class="u-f1">${testimonials.title}</h2>
        <div class="c-testimonials__list c-testimonials__list--left u-fc u-gap u-f1">
          ${testimonialsLeft?.map(renderTestimonialHTML).join('')}
        </div>
        <div class="c-testimonials__list c-testimonials__list--right u-fc u-gap u-f1">
          ${testimonialsRight?.map(renderTestimonialHTML).join('')}
        </div>
      </div>
    </div>
  `;
};

export default renderTestimonialsHTML;
