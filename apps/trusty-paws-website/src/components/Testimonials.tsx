import { faArrowUpRightFromSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

import { Icon, Link, Panel } from 'apps-web';

import { Testimonial as TestimonialType, Testimonials as TestimonialsType } from '../graphql/types';

type Props =
{
  testimonials: TestimonialsType;
};

const Testimonials: FC<Props> = ({ testimonials }) =>
{
  const testimonialCount = testimonials.testimonialsCollection?.items.length ?? 0;
  const halfTestimonialCount = Math.ceil(testimonialCount / 2);

  const testimonialsLeft = testimonials.testimonialsCollection?.items.slice(0, halfTestimonialCount);
  const testimonialsRight = testimonials.testimonialsCollection?.items.slice(halfTestimonialCount);

  return (
    <Panel theme="alt" className="c-testimonials u-py--xl">
      <div className="c-testimonials__content u-container u-fr u-gap u-align--center">
        <h2 className="u-f1">{testimonials.title}</h2>
        <div className="c-testimonials__list c-testimonials__list--left u-fc u-gap u-f1">
          {testimonialsLeft?.map(testimonial =>
            testimonial && <Testimonial key={testimonial.sys.id} testimonial={testimonial} />
          )}
        </div>
        <div className="c-testimonials__list c-testimonials__list--right u-fc u-gap u-f1">
          {testimonialsRight?.map(testimonial =>
            testimonial && <Testimonial key={testimonial.sys.id} testimonial={testimonial} />
          )}
        </div>
      </div>
    </Panel>
  );
};

export default Testimonials;

type TestimonialProps =
{
  testimonial: TestimonialType;
};

const Testimonial: FC<TestimonialProps> = ({ testimonial }) =>
  <div className="c-testimonials__testimonial u-fc u-gap u-p">
    <div className="u-fr u-gap--xs">
      <Icon size="small" icon={faStar} />
      <Icon size="small" icon={faStar} />
      <Icon size="small" icon={faStar} />
      <Icon size="small" icon={faStar} />
      <Icon size="small" icon={faStar} />
    </div>
    <blockquote>{testimonial.content}</blockquote>
    <div className="u-fr u-gap u-justify--space-between u-align--center">
      <div>- {testimonial.author}</div>
      {testimonial.link &&
        <Link theme="alt" shade="front" href={testimonial.link}>
          <Icon size="small" icon={faArrowUpRightFromSquare} />
        </Link>
      }
    </div>
  </div>;
