import { init } from 'based/client';

init['[data-name="carousel"]'] = element =>
{
  let currentIndex = 0;
  let timeout = 0;

  const slideCount = element.querySelectorAll('.c-carousel__slide').length;

  const setCurrentIndex = (index: number) =>
  {
    currentIndex = index;
    element.style.setProperty('--carousel-current-slide-index', currentIndex.toString());

    const setCurrentIndexAll = element.querySelectorAll<HTMLButtonElement>('[data-action="set-current-index"]');
    for (let index = 0; index < setCurrentIndexAll.length; index++)
    {
      setCurrentIndexAll[index].classList.toggle('u-panel--invert', index === currentIndex);
      setCurrentIndexAll[index].classList.toggle('u-panel--middle', index !== currentIndex);
    }
  };

  const autoScroll = () =>
  {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => setCurrentIndex((currentIndex + 1) % slideCount), 5000);
  };

  setCurrentIndex(0);
  autoScroll();

  element.onmouseenter = () => clearTimeout(timeout);
  element.onmouseleave = () => autoScroll();

  const decrementIndex = element.querySelector<HTMLButtonElement>('[data-action="decrement-index"]');
  if (decrementIndex)
  {
    decrementIndex.onclick = () => setCurrentIndex(currentIndex ? currentIndex - 1 : slideCount - 1);
  }

  const incrementIndex = element.querySelector<HTMLButtonElement>('[data-action="increment-index"]');
  if (incrementIndex)
  {
    incrementIndex.onclick = () => setCurrentIndex((currentIndex + 1) % slideCount);
  }

  const setCurrentIndexAll = element.querySelectorAll<HTMLButtonElement>('[data-action="set-current-index"]');
  for (let index = 0; index < setCurrentIndexAll.length; index++)
  {
    setCurrentIndexAll[index].onclick = () => setCurrentIndex(index);
  }
};
