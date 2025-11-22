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

export const mergeElementsFromArray = <T>(parent: HTMLElement, array: T[], idAttribute: string, getId: (arrayElement: T) => string, render: (arrayElement: T) => string) =>
{
  const elements = new Map<string, Element>();
  for (const element of parent.children)
  {
    elements.set(element.getAttribute(idAttribute) as string, element);
  }

  for (const arrayElement of array)
  {
    const id = getId(arrayElement);
    if (!elements.has(id))
    {
      elements.set(id, toElement(render(arrayElement)));
    }
  }

  parent.innerHTML = '';
  for (const arrayElement of array)
  {
    const id = getId(arrayElement);
    parent.appendChild(elements.get(id) as Element);
  }
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
