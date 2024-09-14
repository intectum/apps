import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { Panel } from 'apps-web';

import { main } from '../common/themes';
import '../styles/index.css';
import Header from './Header';

export const metadata: Metadata =
{
  title: 'Trusty Paws'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) =>
  <html lang="en">
    <body>
      <Panel theme={main}>
        <Header/>
        <div className="u-pt--xl">
          {children}
        </div>
      </Panel>
    </body>
  </html>;

export default RootLayout;
