
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

export type ThemeName = 'earth' | 'fire' | 'grass' | 'monochrome' | 'stone' | 'water';

export type Theme = Record<Shade, string>;

export type Themes =
  {
    current: Theme;
  }
  &
  {
    [key in ThemeName]: Theme;
  };

export type WithoutId<T> = Omit<T, 'id'>;
