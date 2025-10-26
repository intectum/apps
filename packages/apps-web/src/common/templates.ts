import { applyInit } from './init';

export const classes = (classes: (string | false | null | undefined)[]) =>
  classes.filter(theClass => !!theClass).join(' ') || undefined;

export const mapToHTML = <T>(elements: T[] | undefined, map: (element: T, index: number, array: T[]) => string) =>
  elements?.map((element, index, array) => map(element, index, array).trim()).join('') ?? '';

export const toElement = <T extends HTMLElement>(html: string, parentTagName = 'div') =>
{
  const container = document.createElement(parentTagName);
  container.innerHTML = html;
  applyInit(container);

  return container.firstElementChild as T;
};

export const toElements = <T extends HTMLElement>(html: string, parentTagName = 'div') =>
{
  const container = document.createElement(parentTagName);
  container.innerHTML = html;
  applyInit(container);

  return Array.from(container.children) as T[];
};

export const replaceSelector = (parent: Element, selector: string, replacement: Element[] | string) =>
{
  const removeAll = parent.querySelectorAll(selector);
  const replaceBefore = removeAll[removeAll.length - 1]?.nextElementSibling ?? null;

  for (const remove of removeAll)
  {
    remove.remove();
  }

  const replacementElements = typeof replacement === 'string' ? toElements(replacement) : replacement;
  for (const replacementElement of replacementElements)
  {
    parent.insertBefore(replacementElement, replaceBefore);
  }
};
