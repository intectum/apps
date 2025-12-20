export type LayoutHTMLRenderer = (js: string, css: string, pageHTML: string) => string;

export const classes = (classes: (string | false | null | undefined)[]) =>
  classes.filter(theClass => !!theClass).join(' ') || undefined;

export const mapToHTML = <T>(elements: T[] | undefined, map: (element: T, index: number, array: T[]) => string) =>
  elements?.map((element, index, array) => map(element, index, array).trim()).join('') ?? '';
