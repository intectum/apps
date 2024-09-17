'use client';

import { createContext, CSSProperties, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { getAppliedTheme, Shade, shades } from 'apps-core';

export type ThemeContextType =
{
  root?: boolean;
  theme?: string;
  shade?: Shade;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () =>
  {
    // do nothing
  }
});

export type ThemeContextProviderProps =
{
  theme: string;
};

export const ThemeContextProvider: FC<PropsWithChildren<ThemeContextProviderProps>> = ({ theme, children }) =>
{
  const [ darkMode, setDarkMode ] = useState(false);
  const [ mounted, setMounted ] = useState(false);

  useEffect(() =>
  {
    setDarkMode(!window.matchMedia?.('(prefers-color-scheme: light)').matches);
    setMounted(true);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        root: true,
        theme: mounted ? theme : undefined,
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeStyle = (theme?: string, shade?: Shade | 'unset', invert?: boolean): CSSProperties =>
{
  const themeContext = useContext(ThemeContext);
  const themeStyle: CSSProperties = {};

  const themeObject = getAppliedTheme(
    theme ?? themeContext.theme,
    shade ?? themeContext.shade,
    invert ? !themeContext.darkMode : themeContext.darkMode
  );

  if (themeContext.root)
  {
    for (const shade of shades)
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (themeStyle as any)[`--theme-${shade}`] = themeObject[shade];
    }
  }

  if (themeContext.root || shade || invert)
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (themeStyle as any)['--theme-front'] = themeObject.front;
    (themeStyle as any)['--theme-back'] = themeObject.back;
  }

  return themeStyle;
};
