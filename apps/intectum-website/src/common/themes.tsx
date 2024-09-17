'use client';

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState } from 'react';

import { Theme, themes } from 'apps-core';
import { ThemeContextProvider } from 'apps-web';

const defaultTheme: Theme = { ...themes.stone, accent: themes.water.accent };

export const MainThemeContext = createContext<[ Theme, Dispatch<SetStateAction<Theme>> ]>([
  defaultTheme,
  () =>
  {
    // do nothing
  }
]);

export const MainThemeContextProvider: FC<PropsWithChildren> = ({ children }) =>
{
  const [ mainTheme, setMainTheme ] = useState(defaultTheme);

  themes.main = mainTheme;

  return (
    <MainThemeContext.Provider value={[ mainTheme, setMainTheme ]}>
      <ThemeContextProvider theme="main">
        {children}
      </ThemeContextProvider>
    </MainThemeContext.Provider>
  );
};
