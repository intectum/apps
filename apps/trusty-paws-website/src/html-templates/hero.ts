import { Hero } from '../graphql/types';
import createRichTextElements from './rich-text';

const createHeroElement = (hero: Hero) =>
{
  const imageHtml = hero.image?.url ?
    `<img class="u-aspect--1" src="${hero.image.url}" alt="${hero.image.title ?? undefined}" />` : '';

  const html = `
    <div class="u-theme--${hero.theme ?? 'main'} u-py--xl">
      <div class="u-container ${hero.imageOnLeft ? 'u-fr--reversed' : 'u-fr'} u-gap--xl">
        <div data-content-container="" class="u-fc u-gap u-justify--center u-f1">
          <h1>${hero.title}</h1>
        </div>
        <div class="u-f1">
          ${imageHtml}
        </div>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;

  if (hero.content)
  {
    const contentContainer = container.querySelector('[data-content-container]') as HTMLElement;
    const elements = createRichTextElements(hero.content.json);
    for (const element of elements)
    {
      contentContainer.appendChild(element);
    }
  }

  return container.firstElementChild as HTMLDivElement;
};

export default createHeroElement;
