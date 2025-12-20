export const activateScrollAnimations = () =>
{
  const updateScrollAnimations = () =>
  {
    const containers = document.querySelectorAll<HTMLElement>('[data-scroll-animation]');
    for (const container of containers)
    {
      const scrollTopZero = container.offsetTop - window.innerHeight;
      const scrollTopOne = container.offsetTop + container.offsetHeight;
      const time = (document.documentElement.scrollTop - scrollTopZero) / (scrollTopOne - scrollTopZero);
      container.style.setProperty('--scroll-animation-time', time.toString());
      container.style.setProperty('visibility', time < 0 || time >= 1 ? 'hidden' : 'visible');
    }
  };

  updateScrollAnimations();

  document.addEventListener('scroll', updateScrollAnimations);
};
