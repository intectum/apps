const pageCache = new Map<string, string>();

export const addNavigation = () =>
  window.addEventListener('popstate', () => navigate(location.pathname));

export const navigate = async (path: string) =>
{
  const pageContainer = document.querySelector('[data-section="page-container"]');
  if (!pageContainer) return;

  if (!pageCache.has(path))
  {
    const pageResponse = await fetch(`${path === '/' ? '/index' : path}.page.html`);
    pageCache.set(path, await pageResponse.text());
  }

  const pageHTML = pageCache.get(path);
  if (!pageHTML) return;

  history.pushState({}, '', path);
  pageContainer.innerHTML = pageHTML;
  document.documentElement.scrollTop = 0;
};
