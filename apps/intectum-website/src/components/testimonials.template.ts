import renderCarouselHTML from '../../components/carousel';

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

const renderTestimonialsHTML = () => `
  <div class="c-home-testimonials u-container u-fc u-gap u-center">
    <h2>Testimonials</h2>
    <div class="c-home-testimonials__body">
      ${renderCarouselHTML(quotes.map(quote => `
        <div class="u-fc u-gap u-center u-text-center u-p--lg">
          <blockquote class="c-home-testimonial__quote">${quote.body}</blockquote>
          <div>- ${quote.credit}</div>
        </div>
      `))}
    </div>
  </div>
`;

export default renderTestimonialsHTML;
