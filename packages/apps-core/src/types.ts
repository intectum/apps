export type DateOnly =
{
  year: number;
  month: number;
  day: number;
};

export type Document =
{
  id: string;
};

export type OptionalId<T> = WithoutId<T> & { id?: string };

export const shades = [ 'back', 'middle', 'front', 'accent' ] as const;
export type Shade = typeof shades[number];

export const sizes = [ 'small', 'medium', 'large' ] as const;
export type Size = typeof sizes[number];

export type Theme = Record<Shade, string>;

export type Themed =
{
  theme?: string;
  shade?: Shade | 'unset';
  invert?: boolean;
};

export type WithoutId<T> = Omit<T, 'id'>;
