export const init: Record<string, (element: HTMLElement) => void> = {};

const initialized = new WeakMap<Element, Set<string>>();

export const applyInit = (root: HTMLElement, keys?: string[]) =>
{
  if (!keys) keys = Object.keys(init);

  for (const key of keys)
  {
    for (const element of root.querySelectorAll(key))
    {
      let keysForElement = initialized.get(element);
      if (keysForElement?.has(key)) continue;
      if (!keysForElement)
      {
        keysForElement = new Set();
        initialized.set(element, keysForElement);
      }
      keysForElement.add(key);
      init[key](element as HTMLElement);
    }
  }
};
