const quotes =
[
  'Meditation is witnessing. To meditate means to become a witness. Meditation is not a technique at all!',
  'These are the qualities of meditation: a really meditative person is playful; life is fun for him, life is a leela, a play. He enjoys it tremendously. He is not serious. He is relaxed.',
  'Meditation is nothing but a device to make you aware of your real self — which is not created by you, which need not be created by you, which you already are. You are born with it. You are it!',
  'Meditation is a science, not a superstition.',
  'Meditation simply says how to go withinward: whether there is a soul or not doesn\'t matter; whether there is a God or not doesn\'t matter.'
];

export class OSHOQuote extends HTMLQuoteElement
{
  connectedCallback()
  {
    const quote = this.querySelector<HTMLQuoteElement>('[data-section="quote"]');
    if (!quote) return;

    quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  }
}

export const defineQuote = () =>
  customElements.define('osho-quote', OSHOQuote, { extends: 'blockquote' });
