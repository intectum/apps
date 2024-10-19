'use client';

import { FC, useEffect, useState } from 'react';

const Quote: FC = () =>
{
  const [ quote, setQuote ] = useState<string>();

  useEffect(() =>
  {
    fetch(`${process.env.API_BASE_URL ?? ''}/quotes.json`).then(async response =>
    {
      const quotes = await response.json() as string[];
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    });
  }, []);

  return (
    <blockquote>
      <div>{quote}</div>
      <div className="u-ml">
        <strong>- Osho</strong>
      </div>
    </blockquote>
  );
};

export default Quote;
