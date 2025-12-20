import { applyInit, init } from './init';

const pageCache = new Map<string, string>();

export const addNavigation = () =>
{
  window.addEventListener('popstate', () => navigate(location.pathname));

  init['a'] = element =>
  {
    // We do not use the .href property as that always contains the full URL
    const href = element.getAttribute('href');
    if (!href) return;

    const external = !!href?.match(/^[a-z]+:/)?.length;
    if (external)
    {
      element.setAttribute('target', '_blank');
      element.setAttribute('referrerPolicy', 'no-referrer');
    }
    else
    {
      fetchPage(href);

      element.onclick = async event =>
      {
        event.preventDefault();

        const currentHref = element.getAttribute('href');
        if (!currentHref) return;
        await navigate(currentHref);
      };
    }
  };

  const pageContainer = document.querySelector<HTMLElement>('[data-name="page-container"]');
  if (!pageContainer) return;

  pageCache.set(toPagePath(location.pathname), pageContainer.innerHTML);
};

export const navigate = async (path: string) =>
{
  const pageContainer = document.querySelector<HTMLElement>('[data-name="page-container"]');
  if (!pageContainer) return;

  const pageHTML = await fetchPage(path, true);
  if (!pageHTML) return;

  history.pushState({}, '', path);
  pageContainer.innerHTML = pageHTML;

  // HACK: get around 404 page loading layout as well
  const innerPageContainer = pageContainer.querySelector('[data-name="page-container"]');
  if (innerPageContainer)
  {
    pageContainer.innerHTML = '';
    for (const child of innerPageContainer.children) pageContainer.appendChild(child);
  }

  applyInit(pageContainer);
  document.documentElement.scrollTop = 0;
};

export const fetchPage = async (path: string, force?: boolean) =>
{
  const pagePath = toPagePath(path);

  const existingPageHTML = pageCache.get(pagePath);
  if (existingPageHTML) return existingPageHTML;

  if (existingPageHTML === undefined || force)
  {
    pageCache.set(pagePath, ''); // prevent duplicate requests when not using 'force'
    const pageResponse = await fetch(pagePath);
    pageCache.set(pagePath, await pageResponse.text());
  }

  return pageCache.get(pagePath);
};

export const toPagePath = (path: string) =>
{
  let finalPath = path;
  if (path.indexOf('?') !== -1) finalPath = finalPath.substring(0, path.indexOf('?'));
  if (finalPath === '/') finalPath = '/index';

  return `${finalPath}.page.html`;
};
