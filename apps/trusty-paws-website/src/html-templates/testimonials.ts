import { Testimonials } from '../graphql/types';
import createTestimonialElement from './testimonial';

const createTestimonialsElement = (testimonials: Testimonials) =>
{
  const html = `
    <div class="c-testimonials u-theme--blue u-py--xl">
      <div class="c-testimonials__content u-container u-fr u-gap u-align--center">
        <h2 class="u-f1">${testimonials.title}</h2>
        <div class="c-testimonials__list c-testimonials__list--left u-fc u-gap u-f1"></div>
        <div class="c-testimonials__list c-testimonials__list--right u-fc u-gap u-f1"></div>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;

  const testimonialCount = testimonials.testimonialsCollection?.items.length ?? 0;
  const halfTestimonialCount = Math.ceil(testimonialCount / 2);

  const testimonialsLeft = testimonials.testimonialsCollection?.items
    .slice(0, halfTestimonialCount)
    .filter(testimonial => !!testimonial);
  if (testimonialsLeft)
  {
    const testimonialsLeftContainer = container.querySelector('.c-testimonials__list--left') as HTMLElement;
    for (const testimonial of testimonialsLeft)
    {
      testimonialsLeftContainer.appendChild(createTestimonialElement(testimonial));
    }
  }

  const testimonialsRight = testimonials.testimonialsCollection?.items
    .slice(halfTestimonialCount)
    .filter(testimonial => !!testimonial);
  if (testimonialsRight)
  {
    const testimonialsRightContainer = container.querySelector('.c-testimonials__list--right') as HTMLElement;
    for (const testimonial of testimonialsRight)
    {
      testimonialsRightContainer.appendChild(createTestimonialElement(testimonial));
    }
  }

  return container.firstElementChild as HTMLDivElement;
};

export default createTestimonialsElement;
