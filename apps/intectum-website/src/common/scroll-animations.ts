export const activateScrollAnimations = () =>
  document.addEventListener('scroll', () =>
  {
    const containers = document.querySelectorAll<HTMLElement>('[data-section="scroll-animation"]');
    for (const container of containers)
    {
      const scrollTopZero = container.offsetTop - window.innerHeight;
      const scrollTopOne = container.offsetTop + container.offsetHeight;
      const time = (document.documentElement.scrollTop - scrollTopZero) / (scrollTopOne - scrollTopZero);
      container.style.setProperty('--scroll-animation-time', time.toString());
      container.style.setProperty('visibility', time < 0 || time >= 1 ? 'hidden' : 'visible');
    }
  });
