import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { ThemeStyle } from 'apps-web';

import themes from '../common/themes';
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" />
      <ThemeStyle themes={themes} />
    </head>
    <body>
      {children}
    </body>
  </html>;

export default RootLayout;
