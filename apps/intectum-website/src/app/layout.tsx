import { Metadata } from 'next';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import { Panel } from 'apps-web';

import '../styles/index.css';

export const metadata: Metadata =
{
  title: 'intectum',
  description: 'Senior developer with 17 years of experience'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) =>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|PT+Serif&display=swap"/>
    </head>
    <body>
      <Panel theme="stone" accent="water">
        <header>
          <Panel className="u-fr u-p">
            <nav className="o-row u-center">
              <Link href="/" className="u-text-large">intectum</Link>
              <Link href="/projects">projects</Link>
            </nav>
          </Panel>
        </header>
        <img src="/images/logo.png" alt="intectum" className="c-background" />
        <main className="o-container">
          {children}
        </main>
      </Panel>
    </body>
  </html>;

export default RootLayout;
