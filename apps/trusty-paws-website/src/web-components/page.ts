import { Document } from '@contentful/rich-text-types';

import { queryContentful } from '../common/contentful';
import { PageQuery } from '../common/queries';
import { PageContentLinks } from '../graphql/types';
import createRichTextElements from '../html-templates/rich-text';

export let pageDoc: Document | undefined = undefined;
export let pageLinks: PageContentLinks | undefined = undefined;

class TrustyPawsPage extends HTMLElement
{
  static observedAttributes = [ 'path' ];

  private _path?: string;

  get path()
  {
    return this._path;
  }

  set path(path: string | undefined)
  {
    this._path = path;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async attributeChangedCallback(name: string, oldValue: any, newValue: any)
  {
    if (name === 'path')
    {
      if (!newValue) return;
      this.innerHTML = '';

      const pages = await queryContentful(PageQuery, { path: newValue });

      const content = pages?.pageCollection?.items[0]?.content;
      if (!content)
      {
        this.innerText = `Page content not found for path '${newValue}'`;
        return;
      }

      pageDoc = content.json;
      pageLinks = content.links as PageContentLinks;

      const elements = createRichTextElements(content.json, content.links as PageContentLinks);
      for (const element of elements)
      {
        this.appendChild(element);
      }
    }
  }
}

customElements.define('trusty-paws-page', TrustyPawsPage);
