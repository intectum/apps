'use client';

import { FC, PropsWithChildren } from 'react';

import { themes } from 'apps-core';
import { ThemeContextProvider } from 'apps-web';

export const MainThemeContextProvider: FC<PropsWithChildren> = ({ children }) =>
{
  themes.main =
  {
    light: '#fff',
    medium: '#757575',
    dark: '#000',
    accent: '#060'
  };

  themes.alt =
  {
    light: '#060',
    medium: '#080',
    dark: '#fff',
    accent: '#000'
  };

  return (
    <ThemeContextProvider theme="main" ignoreDarkMode>
      {children}
    </ThemeContextProvider>
  );
};
