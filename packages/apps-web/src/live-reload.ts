export const enableLiveReload = () =>
  new EventSource('/esbuild').addEventListener('change', () => location.reload());
