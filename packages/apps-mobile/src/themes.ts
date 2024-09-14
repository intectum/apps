import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

import { adaptThemes, createThemes, Shade, Theme, ThemeName, Themes } from 'apps-core';

export const ThemeContext = createContext<Themes | undefined>(undefined);

export const useThemes = (current?: Theme | ThemeName, back?: Shade) =>
{
  const colorScheme = useColorScheme();
  const themes = useContext(ThemeContext);

  return adaptThemes(themes ?? createThemes(colorScheme === 'dark'), current, back);
};
