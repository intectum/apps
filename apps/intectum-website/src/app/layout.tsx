import { Metadata } from 'next';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import '../common/fontawesome';
import '../styles/index.css';

export const metadata: Metadata =
{
  title: 'intectum'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) =>
  <html lang="en">
    <body>
      <header className="u-flex u-p">
        <nav className="u-flex u-flex--centered u-flex--spaced">
          <Link href="/" className="u-text-large">intectum</Link>
          <Link href="/projects" className="u-color--light">projects</Link>
        </nav>
      </header>
      <img src="/images/logo.png" alt="intectum" className="c-background"/>
      <div className="o-container">
        {children}
      </div>
    </body>
  </html>
;

export default RootLayout;
