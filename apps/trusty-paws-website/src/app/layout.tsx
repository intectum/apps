import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import '../styles/index.css';

export const metadata: Metadata =
{
  title: 'Trusty Paws'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) =>
  <html lang="en">
    <body className="u-pt--xl">
      <header className="u-flex u-flex--centered u-flex--space-between u-p">
        Trusty Paws
        <button type="button" className="c-button c-button--primary">Book</button>
      </header>
      {children}
    </body>
  </html>;

export default RootLayout;
