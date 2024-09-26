'use client';

import { FC, PropsWithChildren } from 'react';

import { themes } from 'apps-core';
import { ThemeContextProvider } from 'apps-web';

export const MainThemeContextProvider: FC<PropsWithChildren> = ({ children }) =>
{
  themes.main =
  {
    light: '#fff',
    medium: '#999',
    dark: '#333',
    accent: '#0713fe'
  };

  return (
    <ThemeContextProvider theme="main" ignoreDarkMode>
      {children}
    </ThemeContextProvider>
  );
};
