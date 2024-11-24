const pageCache = new Map<string, string>();

export const addNavigation = () =>
{
  window.addEventListener('popstate', () => navigate(location.pathname));

  const pageContainer = document.querySelector('[data-section="page-container"]');
  if (!pageContainer) return;

  pageCache.set(location.pathname, pageContainer.innerHTML);
};

export const navigate = async (path: string) =>
{
  const pageContainer = document.querySelector('[data-section="page-container"]');
  if (!pageContainer) return;

  const pageHTML = await fetchPage(path, true);
  if (!pageHTML) return;

  history.pushState({}, '', path);
  pageContainer.innerHTML = pageHTML;
  document.documentElement.scrollTop = 0;
};

export const fetchPage = async (path: string, force?: boolean) =>
{
  const existingPageHTML = pageCache.get(path);
  if (existingPageHTML) return existingPageHTML;

  if (existingPageHTML === undefined || force)
  {
    pageCache.set(path, ''); // prevent duplicate requests when not using 'force'
    const pageResponse = await fetch(`${path === '/' ? '/index' : path}.page.html`);
    pageCache.set(path, await pageResponse.text());
  }

  return pageCache.get(path);
};
