import { Theme } from './types';

export const createThemeFromHue = (hue: number): Theme =>
  ({
    back: `hsl(${hue}, 25%, 85%)`,
    middle: `hsl(${hue}, 25%, 50%)`,
    front: `hsl(${hue}, 25%, 15%)`,
    accent: `hsl(${hue}, 75%, 50%)`
  });

export const intectumThemes: Record<string, Theme> =
{
  earth: createThemeFromHue(25),
  fire: createThemeFromHue(0),
  grass: createThemeFromHue(125),
  stone: { back: '#cccccc', middle: '#888888', front: '#333333', accent: '#ffffff' },
  water: createThemeFromHue(200)
};
