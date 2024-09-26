import { hsv } from 'color-convert';

import { AppliedTheme, Shade, Theme } from './types';

export const createThemeFromHue = (hue: number) =>
  ({
    light: `#${hsv.hex([ hue, 33, 80 ])}`,
    medium: `#${hsv.hex([ hue, 33, 53 ])}`,
    dark: `#${hsv.hex([ hue, 33, 20 ])}`,
    accent: `#${hsv.hex([ hue, 66, 53 ])}`
  });

export const themes: Record<string, Theme> =
{
  earth: createThemeFromHue(25),
  fire: createThemeFromHue(0),
  grass: createThemeFromHue(125),
  monochrome: { light: '#ffffff', medium: 'transparent', dark: '#000000', accent: 'transparent' },
  stone: { light: '#cccccc', medium: '#757575', dark: '#333333', accent: '#ffffff' },
  water: createThemeFromHue(200)
};

export const getAppliedTheme = (theme?: string, shade?: Shade | 'unset', darkMode?: boolean): AppliedTheme =>
{
  if (!theme)
  {
    theme = 'stone';
  }

  if (!themes[theme])
  {
    console.log(`theme ${theme} not found, defaulting to 'stone'`);
    theme = 'stone';
  }

  const themeObject = themes[theme];

  let front = darkMode ? themeObject.light : themeObject.dark;
  let back = darkMode ? themeObject.dark : themeObject.light;

  if (shade === 'light')
  {
    front = themeObject.dark;
    back = themeObject.light;
  }
  else if (shade === 'medium')
  {
    back = themeObject.medium;
  }
  else if (shade === 'dark')
  {
    front = themeObject.light;
    back = themeObject.dark;
  }
  else if (shade === 'accent')
  {
    front = themeObject.dark;
    back = themeObject.accent;
  }

  return {
    ...themeObject,
    front,
    back
  };
};
