export const enableLiveReload = () =>
  new EventSource('/live-reload').addEventListener('change', () => location.reload());
