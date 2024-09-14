
export interface DateOnly
{
  year: number;
  month: number;
  day: number;
}

export interface Document
{
  id: string;
}

export type OptionalId<T> = WithoutId<T> & { id?: string };

export const shades = [ 'light', 'medium', 'dark', 'accent', 'front', 'back' ];
export type Shade = typeof shades[number];

export const sizes = [ 'small', 'medium', 'large' ];
export type Size = typeof sizes[number];

export const themeNames = [ 'earth', 'fire', 'grass', 'monochrome', 'stone', 'water' ];
export type ThemeName = typeof themeNames[number];

export type Theme = Record<Shade, string>;

export interface Themeable
{
  theme?: Theme | ThemeName;
  shade?: Shade;
  accent?: string | ThemeName;
}

export type Themes =
  {
    current: Theme;
  }
  &
  {
    [key in ThemeName]: Theme;
  };

export type WithoutId<T> = Omit<T, 'id'>;
