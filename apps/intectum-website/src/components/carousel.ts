class Carousel extends HTMLDivElement
{
  private slideCount = 0;
  private currentIndex = 0;
  private timeout = 0;

  connectedCallback()
  {
    this.slideCount = this.querySelectorAll('.c-carousel__slide').length;
    this.setCurrentIndex(0);
    this.autoScroll();

    this.onmouseenter = () => this.stopAutoScroll();
    this.onmouseleave = () => this.autoScroll();

    const decrementIndex = this.querySelector<HTMLButtonElement>('[data-action="decrement-index"]');
    if (decrementIndex)
    {
      decrementIndex.onclick = () => this.setCurrentIndex(this.currentIndex ? this.currentIndex - 1 : this.slideCount - 1);
    }

    const incrementIndex = this.querySelector<HTMLButtonElement>('[data-action="increment-index"]');
    if (incrementIndex)
    {
      incrementIndex.onclick = () => this.setCurrentIndex((this.currentIndex + 1) % this.slideCount);
    }

    const setCurrentIndexAll = this.querySelectorAll<HTMLButtonElement>('[data-action="set-current-index"]');
    for (let index = 0; index < setCurrentIndexAll.length; index++)
    {
      setCurrentIndexAll[index].onclick = () => this.setCurrentIndex(index);
    }
  }

  disconnectCallback()
  {
    this.stopAutoScroll();
  }

  stopAutoScroll()
  {
    clearTimeout(this.timeout);
  }

  autoScroll()
  {
    this.stopAutoScroll();
    this.timeout = window.setTimeout(() => this.setCurrentIndex((this.currentIndex + 1) % this.slideCount), 5000);
  }

  setCurrentIndex(currentIndex: number)
  {
    this.currentIndex = currentIndex;
    this.style.setProperty('--carousel-current-slide-index', currentIndex.toString());

    const setCurrentIndexAll = this.querySelectorAll<HTMLButtonElement>('[data-action="set-current-index"]');
    for (let index = 0; index < setCurrentIndexAll.length; index++)
    {
      setCurrentIndexAll[index].classList.toggle('u-panel--invert', index === this.currentIndex);
      setCurrentIndexAll[index].classList.toggle('u-panel--middle', index !== this.currentIndex);
    }
  }
}

customElements.define('intectum-carousel', Carousel, { extends: 'div' });
