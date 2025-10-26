export const init: Record<string, (element: HTMLElement) => void> = {};

export const applyInit = (root: HTMLElement) =>
{
  for (const key of Object.keys(init))
  {
    for (const element of root.querySelectorAll(key))
    {
      init[key](element as HTMLElement);
    }
  }
};
