import { FC } from 'react';

import { Panel } from 'apps-web';

import { Testimonials as TestimonialsType } from '../graphql/types';

type Props =
{
  testimonials: TestimonialsType;
};

const Testimonials: FC<Props> = ({ testimonials }) =>
  <Panel theme="alt" className="u-py--xl">
    <div className="o-container u-fc u-text-center">
      <h2 className="u-pb--xl">{testimonials.title}</h2>
      <div className="o-row">
        {testimonials.testimonialsCollection?.items.map(testimonial =>
          <div key={testimonial?.sys.id} className="o-column">
            <blockquote>{testimonial?.content}</blockquote>
            <div>- {testimonial?.author}</div>
          </div>
        )}
      </div>
    </div>
  </Panel>;

export default Testimonials;
