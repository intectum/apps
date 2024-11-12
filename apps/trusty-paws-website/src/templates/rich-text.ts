import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';

import { PageContentLinks } from '../graphql/types';
import renderCallToActionHTML from './call-to-action';
import renderContactFormHTML from './contact-form';
import renderHeroHTML from './hero';
import renderServicesHTML from './services';
import renderStepByStepHTML from './step-by-step';
import renderTestimonialsHTML from './testimonials';

const entryTemplates = {
  CallToAction: renderCallToActionHTML,
  ContactForm: renderContactFormHTML,
  Hero: renderHeroHTML,
  Services: renderServicesHTML,
  StepByStep: renderStepByStepHTML,
  Testimonials: renderTestimonialsHTML
};

const renderRichTextHTML = (doc: Document, links?: PageContentLinks) =>
{
  const assetMap = new Map();
  const entryMap = new Map();

  if (links)
  {
    for (const asset of links.assets.block)
    {
      asset?.sys.id && assetMap.set(asset?.sys.id, asset);
    }

    for (const entry of links.entries.block)
    {
      entry?.sys.id && entryMap.set(entry?.sys.id, entry);
    }
    for (const entry of links.entries.inline)
    {
      entry?.sys.id && entryMap.set(entry?.sys.id, entry);
    }
  }

  const options: Options =
  {
    renderNode:
    {
      [BLOCKS.EMBEDDED_ASSET]: node =>
      {
        const asset = assetMap.get(node.data.target.sys.id);
        if (!asset) return `<div style="color: red;">Asset ${node.data.target.sys.id} not found</div>`;

        return `<img src="${asset.url}" alt="${asset.title}" />`;
      },
      [BLOCKS.EMBEDDED_ENTRY]: node =>
      {
        const entry = entryMap.get(node.data.target.sys.id);
        if (!entry) return `Entry ${node.data.target.sys.id} not found`;

        const template = entryTemplates[entry.__typename as keyof typeof entryTemplates];
        if (!template) return `<div style="color: red;">Template not found for type ${entry.__typename}</div>`;

        return template(entry);
      },
      [INLINES.EMBEDDED_ENTRY]: node =>
      {
        const entry = entryMap.get(node.data.target.sys.id);
        if (!entry) return `Entry ${node.data.target.sys.id} not found`;

        const template = entryTemplates[entry.__typename as keyof typeof entryTemplates];
        if (!template) return `<div style="color: red;">Template not found for type ${entry.__typename}</div>`;

        return template(entry);
      }
    }
  };

  return documentToHtmlString(doc, options);
};

export default renderRichTextHTML;
