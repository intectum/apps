import { hsv } from 'color-convert';

import { Shade, ThemeName, Theme, Themes } from './types';

export const createThemes = (darkMode: boolean): Themes =>
{
  const themes: { [key in ThemeName]: Theme } =
  {
    earth: createThemeFromHue(25, darkMode),
    fire: createThemeFromHue(0, darkMode),
    grass: createThemeFromHue(125, darkMode),
    monochrome: createTheme('#ffffff', 'transparent', '#000000', 'transparent', darkMode),
    stone: createTheme('#cccccc', '#888888', '#333333', '#ffffff', darkMode),
    water: createThemeFromHue(200, darkMode)
  };

  return { ...themes, current: themes.earth };
};

export const createTheme = (light: string, medium: string, dark: string, bright: string, darkMode: boolean): Theme =>
  ({
    light,
    medium,
    dark,
    bright,
    front: darkMode ? light : dark,
    back: darkMode ? dark : light
  });

export const createThemeFromHue = (hue: number, darkMode: boolean) =>
  createTheme(
    `#${hsv.hex([ hue, 25, 75 ])}`,
    `#${hsv.hex([ hue, 50, 50 ])}`,
    `#${hsv.hex([ hue, 75, 25 ])}`,
    `#${hsv.hex([ hue, 100, 100 ])}`,
    darkMode
  );

export const adaptThemes = (source: Themes, current?: Theme | ThemeName, back?: Shade): Themes =>
{
  if (!current && !back)
  {
    // TODO deep copy?
    return source;
  }

  const adaptedThemes: { [key in ThemeName]: Theme } =
  {
    earth: adaptTheme(source.earth, back),
    fire: adaptTheme(source.fire, back),
    grass: adaptTheme(source.grass, back),
    monochrome: adaptTheme(source.monochrome, back),
    stone: adaptTheme(source.stone, back),
    water: adaptTheme(source.water, back)
  };

  const adaptedCurrent = typeof current === 'string' ? adaptedThemes[current] : adaptTheme(current ?? source.current, back);

  return { ...adaptedThemes, current: adaptedCurrent };
};

export const adaptTheme = (theme: Theme, back?: Shade): Theme =>
{
  const adaptedTheme: Theme = { ...theme };

  if (back)
  {
    adaptedTheme.back = theme[back];
    if ([ 'bright', 'light' ].includes(back))
    {
      adaptedTheme.front = theme.dark;
    }
    else if (back === 'dark')
    {
      adaptedTheme.front = theme.light;
    }
    else if (back === 'front')
    {
      adaptedTheme.front = theme.back;
    }
  }

  return adaptedTheme;
};
