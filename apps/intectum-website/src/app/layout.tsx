import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import { Circle, Icon, Panel } from 'apps-web';

import { MainThemeContextProvider } from '../common/themes';
import Logo from '../components/Logo';
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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|PT+Serif&display=swap"/>
      <link rel="icon" href="/images/logo.svg" />
    </head>
    <body>
      <MainThemeContextProvider>
        <Panel>
          <header>
            <Panel className="u-fr u-justify--space-between u-align--center u-p">
              <nav className="o-row u-align--center">
                <Link href="/" title="Home">
                  <Circle className="u-small-down">
                    <Logo />
                  </Circle>
                  <div className="u-text-large u-medium-up">intectum</div>
                </Link>
                <Link href="/projects" title="Projects">
                  <Circle className="u-small-down">
                    <Icon icon={faFolderOpen} />
                  </Circle>
                  <div className="u-medium-up">projects</div>
                </Link>
              </nav>
              <ThemeSelector />
            </Panel>
          </header>
          <div className="c-background u-fc u-center">
            <Logo className="c-background__logo" />
          </div>
          <main>
            {children}
          </main>
        </Panel>
      </MainThemeContextProvider>
    </body>
  </html>;

export default RootLayout;
