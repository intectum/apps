import { Hero } from '../graphql/types';
import renderRichTextHTML from './rich-text';

const renderHeroHTML = (hero: Hero) =>
{
  const imageHtml = hero.image?.url ?
    `<img class="u-aspect--1" src="${hero.image.url}" alt="${hero.image.title ?? undefined}" />` : '';

  return `
    <div class="u-theme--${hero.theme ?? 'main'} u-py--xl">
      <div class="u-container ${hero.imageOnLeft ? 'u-fr--reversed' : 'u-fr'} u-gap--xl">
        <div data-content-container="" class="u-fc u-gap u-justify--center u-f1">
          <h1>${hero.title}</h1>
          ${hero.content?.json ? renderRichTextHTML(hero.content.json) : ''}
        </div>
        <div class="u-f1">
          ${imageHtml}
        </div>
      </div>
    </div>
  `;
};

export default renderHeroHTML;
