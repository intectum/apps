export const toElement = <T extends Element>(html: string) =>
{
  const container = document.createElement('div');
  container.innerHTML = html;

  return container.firstElementChild as T | null;
};

export const toElements = <T extends Element>(html: string) =>
{
  const container = document.createElement('div');
  container.innerHTML = html;

  return Array.from(container.children) as T[];
};
