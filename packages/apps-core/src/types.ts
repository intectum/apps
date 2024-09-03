
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

export type Shade = 'light' | 'medium' | 'dark' | 'bright' | 'front' | 'back';

export type Size = 'small' | 'medium' | 'large';

export type ThemeName = 'earth' | 'fire' | 'grass' | 'monochrome' | 'stone' | 'water';

export type Theme = Record<Shade, string>;

export interface Themeable
{
  theme?: Theme | ThemeName;
  shade?: Shade;
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
