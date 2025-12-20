export const init: Record<string, (element: HTMLElement) => void> = {};

export const applyInit = (root: HTMLElement, keys?: string[]) =>
{
  if (!keys) keys = Object.keys(init);

  for (const key of keys)
  {
    for (const element of root.querySelectorAll(key))
    {
      init[key](element as HTMLElement);
    }
  }
};
