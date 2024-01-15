import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

import { adaptThemes, createThemes, Shade, Theme, ThemeName, Themes } from 'apps-core';

export const ThemeContext = createContext<Themes>({} as Themes);

export const useThemes = (current?: Theme | ThemeName, back?: Shade) =>
{
  const colorScheme = useColorScheme();
  const themes = useContext(ThemeContext);

  // If no theme colors have been provided yet
  if (!Object.keys(themes).length)
  {
    Object.assign(themes, createThemes(colorScheme === 'dark'));
  }

  return adaptThemes(themes, current, back);
};
