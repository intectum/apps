import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { Panel } from 'apps-web';

import '../styles/index.css';

export const metadata: Metadata =
{
  title: 'OSHO Auckland',
  description: 'OSHO Information Center: Auckland, New Zealand',
  manifest: '/manifest.json'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) =>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" />
    </head>
    <body>
      <Panel
        theme={{
          light: '#fff',
          medium: '#999',
          dark: '#333',
          accent: '#0713fe',
          front: '#333',
          back: '#fff'
        }}
      >
        {children}
      </Panel>
    </body>
  </html>;

export default RootLayout;
