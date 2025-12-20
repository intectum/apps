let nextKey = 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const state = new Map<number, any>();

const mutationObserver = new MutationObserver(records =>
{
  for (const record of records)
  {
    for (const node of record.removedNodes)
    {
      if (node instanceof Element) removeState(node);
    }
  }
});

mutationObserver.observe(document, { subtree: true, childList: true });

export const getState = <T>(element: Element, defaultValue?: T) =>
{
  if (!element.hasAttribute('data-state-key'))
  {
    state.set(getStateKey(element), defaultValue);
  }

  return state.get(getStateKey(element)) as T | undefined;
};

export const setState = <T>(element: Element, value: T) =>
{
  state.set(getStateKey(element), value);
  element.dispatchEvent(new Event('state', { bubbles: false }));
};

export const removeState = (element: Element) =>
{
  if (element.hasAttribute('data-state-key'))
  {
    element.removeAttribute('data-state-key');
    state.delete(getStateKey(element));
  }

  for (const child of element.children)
  {
    removeState(child);
  }
};

export const getStateKey = (element: Element) =>
{
  if (!element.hasAttribute('data-state-key'))
  {
    element.setAttribute('data-state-key', nextKey.toString());
    nextKey++;
  }

  return Number(element.getAttribute('data-state-key'));
};
