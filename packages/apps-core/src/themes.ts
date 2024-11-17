import { hsv } from 'color-convert';

import { Theme } from './types';

export const createThemeFromHue = (hue: number): Theme =>
  ({
    back: `#${hsv.hex([ hue, 33, 80 ])}`,
    middle: `#${hsv.hex([ hue, 33, 53 ])}`,
    front: `#${hsv.hex([ hue, 33, 20 ])}`,
    accent: `#${hsv.hex([ hue, 66, 53 ])}`
  });

export const intectumThemes: Record<string, Theme> =
{
  earth: createThemeFromHue(25),
  fire: createThemeFromHue(0),
  grass: createThemeFromHue(125),
  stone: { back: '#cccccc', middle: '#888888', front: '#333333', accent: '#ffffff' },
  water: createThemeFromHue(200)
};
