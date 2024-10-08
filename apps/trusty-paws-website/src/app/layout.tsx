import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { Panel } from 'apps-web';

import { MainThemeContextProvider } from '../common/themes';
import '../styles/index.css';
import Header from './Header';

export const metadata: Metadata =
{
  title: 'Trusty Paws'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) =>
  <html lang="en">
    <body>
      <MainThemeContextProvider>
        <Panel>
          <Header/>
          <div className="u-pt--xl">
            {children}
          </div>
        </Panel>
      </MainThemeContextProvider>
    </body>
  </html>;

export default RootLayout;
