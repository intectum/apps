import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { ThemeStyle } from 'apps-web';

import themes from '../common/themes';
import Header from '../components/Header';
import '../styles/index.css';

export const metadata: Metadata =
{
  title: 'Trusty Paws',
  description: 'Trusted local pet sitting in London'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) =>
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Calistoga&display=swap" />
      <link rel="icon" href="/logo-paw.svg" />
      <ThemeStyle themes={themes} />
    </head>
    <body>
      <Header />
      <main>
        {children}
      </main>
    </body>
  </html>;

export default RootLayout;
