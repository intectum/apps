import { Metadata } from 'next';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import { Panel } from 'apps-web';

import { MainThemeContextProvider } from '../common/themes';
import ThemeSelector from '../components/ThemeSelector';
import '../styles/index.css';

export const metadata: Metadata =
{
  title: 'intectum',
  description: 'Senior developer with 17 years of experience'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) =>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|PT+Serif&display=swap" />
    </head>
    <body>
      <MainThemeContextProvider>
        <Panel>
          <header>
            <Panel className="u-fr u-justify--space-between u-align--center u-p">
              <nav className="o-row u-align--center">
                <Link href="/" className="u-text-large">intectum</Link>
                <Link href="/projects">projects</Link>
              </nav>
              <ThemeSelector />
            </Panel>
          </header>
          <img
            src="/images/logo.png"
            alt="intectum"
            className="c-background"
            loading="lazy"
          />
          <main>
            {children}
          </main>
        </Panel>
      </MainThemeContextProvider>
    </body>
  </html>;

export default RootLayout;
