import { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () =>
{
  const quotes =
  [
    <blockquote>
      <p>Simplicity is not an ideal, you cannot impose simplicity on yourself. That’s why I never say that people like Mahatma Gandhi are simple. They are not, they cannot be. Simplicity is their ideal, they are trying to attain it. Simplicity is a goal far away in the future, distant, and they are striving, they are straining, they are in great effort. How can you create simplicity out of effort? Simplicity simply means that which is. Out of effort you are trying to improve upon existence.</p>
      <figcaption>Osho in <cite title="Source Title">The Secret, Talk #10</cite></figcaption>
    </blockquote>,
    <blockquote>
      <p>Simplicity is not a requirement but a by-product of innocence. It comes just like your shadow. Don’t try to be simple. If you try to be simple, the very effort destroys simplicity. You cannot cultivate simplicity; a cultivated simplicity is superficial. Simplicity has to follow you like a shadow. You need not bother about it. You need not look back again and again to see whether the shadow is following you or not. The shadow is bound to follow you.</p>
      <figcaption>Osho in <cite title="Source Title">The White Lotus, Talk #6</cite></figcaption>
    </blockquote>,
    <blockquote>
      <p>Simplicity means to just be yourself, whosoever you are, in tremendous acceptance, with no goal, with no ideal. All ideals are crap; scrap all of them.</p>
      <figcaption>Osho in <cite title="Source Title">The Secret, Talk #10</cite></figcaption>
    </blockquote>,
    <blockquote>
      <p>Elegant simplicity... It was not a practiced simplicity. It was not a cultivated simplicity. It was elegant, it was natural. The ego had disappeared. That’s why there was simplicity. You can practice simplicity, but then it is just a decoration of the ego.</p>
      <p>There are two kinds of simplicity. One simplicity: the so-called mahatma, the saint, who practices it. It is a very calculated move, a calculated gesture. It is very cunning. It is not simplicity, it is a facade. Then there is another kind of simplicity: elegant, graceful, spontaneous, uncultivated, natural like that of a child, unselfconscious. Hence elegant, hence graceful.</p>
      <figcaption>Osho in <cite title="Source Title">Zen, The Path of Paradox, Vol. 3, Talk #9</cite></figcaption>
    </blockquote>
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="o-container">
      <h1 className="u-color--primary">intectum</h1>
      {quote}
      <div className="u-text-center">
        <Link className="c-button c-button--primary u-m--sm" to="/freelance">freelance senior developer</Link>
        {/* <Link className="c-button c-button--primary u-m--sm" to="/software">open source software</Link>
        <Link className="c-button c-button--primary u-m--sm" to="/hardware">woodworking & hardware</Link> */}
        <Link className="c-button c-button--primary u-m--sm" to="/projects">project history</Link>
      </div>
    </div>
  );
};

export default Home;
