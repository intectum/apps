import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { Circle, Icon, Link, Panel, ThemeStyle } from 'apps-web';

import themes from '../common/themes';
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|PT+Serif&display=swap" />
      <link rel="icon" href="/images/logo.svg" />
      <ThemeStyle themes={themes} />
    </head>
    <body>
      <div className="c-background u-fc u-center">
        <Logo className="c-background__logo"/>
      </div>
      <header>
        <Panel className="u-fr u-justify--space-between u-align--center u-p">
          <nav className="u-fr u-gap u-align--center">
            <Link href="/" title="Home">
              <Circle className="u-small-down">
                <Logo/>
              </Circle>
              <div className="u-text-large u-medium-up">intectum</div>
            </Link>
            <Link href="/projects" title="Projects">
              <Circle className="u-small-down">
                <Icon icon={faFolderOpen}/>
              </Circle>
              <div className="u-medium-up">projects</div>
            </Link>
          </nav>
          <ThemeSelector/>
        </Panel>
      </header>
      <main>
        {children}
      </main>
    </body>
  </html>;

export default RootLayout;
