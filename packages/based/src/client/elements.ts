import { applyInit } from './init';

export const toElement = <T extends HTMLElement>(html: string, parent: string | HTMLElement = 'div') =>
{
  if (typeof(parent) === 'string') parent = document.createElement(parent);

  parent.innerHTML = html;
  applyInit(parent);

  return parent.firstElementChild as T;
};

export const toElements = <T extends HTMLElement>(html: string, parent: string | HTMLElement = 'div') =>
{
  if (typeof(parent) === 'string') parent = document.createElement(parent);

  parent.innerHTML = html;
  applyInit(parent);

  return Array.from(parent.children) as T[];
};

export const toArrayElements = <T>(parent: HTMLElement, array: T[], idAttribute: string, getId: (arrayElement: T) => string, render: (arrayElement: T) => string) =>
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
