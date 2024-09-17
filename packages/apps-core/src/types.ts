
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

export const shades = [ 'light', 'medium', 'dark', 'accent' ] as const;
export type Shade = typeof shades[number];

export const sizes = [ 'small', 'medium', 'large' ] as const;
export type Size = typeof sizes[number];

export type Theme = Record<Shade, string>;

export type AppliedTheme = Theme &
{
  front: string;
  back: string;
};

export interface Themeable
{
  theme?: string;
  shade?: Shade | 'unset';
  invert?: boolean;
}

export type WithoutId<T> = Omit<T, 'id'>;
