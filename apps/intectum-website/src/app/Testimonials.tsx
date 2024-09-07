import { FC } from 'react';

import Carousel from '../components/Carousel';

const Testimonials: FC = () =>
{
  const quotes =
  [
    {
      body: 'Loved working with Gyan. He is a great software engineer with a deep knowledge spanning multiple verticals across the space. Level-headed and pragmatic he takes on any challenge with confidence and a smile. Would recommend Gyan for any software endeavour.',
      credit: 'Logan Maire, Colenso BBDO'
    },
    {
      body: 'Loved working with Gyan. He is a great software engineer with a deep knowledge spanning multiple verticals across the space. Level-headed and pragmatic he takes on any challenge with confidence and a smile. Would recommend Gyan for any software endeavour.',
      credit: 'Logan Maire, Colenso BBDO'
    },
    {
      body: 'Loved working with Gyan. He is a great software engineer with a deep knowledge spanning multiple verticals across the space. Level-headed and pragmatic he takes on any challenge with confidence and a smile. Would recommend Gyan for any software endeavour.',
      credit: 'Logan Maire, Colenso BBDO'
    }
  ];

  return (
    <div className="c-home-testimonials u-flex u-flex--column u-flex--centered u-flex--spaced">
      <h2>Testimonials</h2>
      <div className="c-home-testimonials__body">
        <Carousel>
          {quotes.map((quote, index) =>
            <div
              key={index}
              className="u-flex u-flex--column u-flex--centered u-flex--spaced u-text-center u-p--lg"
            >
              <blockquote className="c-home-testimonial__quote">{quote.body}</blockquote>
              <div>- {quote.credit}</div>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
