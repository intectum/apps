'use client';

import { createContext, CSSProperties, useContext } from 'react';

import { adaptThemes, createThemes, Shade, shades, Theme, ThemeName, Themes } from 'apps-core';

export const ThemeContext = createContext<Themes | undefined>(undefined);

export const useThemes = (current?: Theme | ThemeName, back?: Shade, accent?: string | ThemeName) =>
{
  const darkMode = !window.matchMedia?.('(prefers-color-scheme: light)').matches;
  const themes = useContext(ThemeContext);

  return adaptThemes(themes ?? createThemes(darkMode), current, back, accent);
};

export const useThemeStyle = (themes: Themes): CSSProperties =>
{
  const parentThemes = useContext(ThemeContext);
  const themeStyle: CSSProperties = {};

  for (const shade of shades)
  {
    if (!parentThemes || themes.current[shade] !== parentThemes.current[shade])
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (themeStyle as any)[`--theme-${shade}`] = themes.current[shade];
    }
  }

  return themeStyle;
};
