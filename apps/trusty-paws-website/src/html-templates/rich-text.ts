import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';

import {
  Asset,
  CallToAction,
  ContactForm,
  Entry,
  Hero,
  Maybe,
  PageContentLinks,
  Services,
  StepByStep,
  Testimonials
} from '../graphql/types';
import createCallToActionElement from './call-to-action';
import createContactFormElement from './contact-form';
import createHeroElement from './hero';
import createServicesElement from './services';
import createStepByStepElement from './step-by-step';
import createTestimonialsElement from './testimonials';

const createRichTextElements = (doc: Document, links?: PageContentLinks) =>
{
  const assetMap = new Map<string, Maybe<Asset>>();
  const entryMap = new Map<string, Maybe<Entry>>();

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

  const container = document.createElement('div');
  container.innerHTML = documentToHtmlString(doc, options);

  const embeddedAssetPlaceholders = container.querySelectorAll('[data-rich-text-asset]');
  for (const embeddedAssetPlaceholder of embeddedAssetPlaceholders)
  {
    const id = embeddedAssetPlaceholder.getAttribute('data-rich-text-id');
    if (!id)
    {
      (embeddedAssetPlaceholder as HTMLElement).style.color = 'red';
      embeddedAssetPlaceholder.innerHTML = 'data-rich-text-id not found';
      continue;
    }

    const asset = assetMap.get(id);
    if (!asset)
    {
      (embeddedAssetPlaceholder as HTMLElement).style.color = 'red';
      embeddedAssetPlaceholder.innerHTML = `Asset ${id} not found`;
      continue;
    }

    const img = document.createElement('img');
    img.src = asset.url ?? '';
    img.alt = asset.title ?? '';

    embeddedAssetPlaceholder.parentElement?.insertBefore(img, embeddedAssetPlaceholder);
    embeddedAssetPlaceholder.remove();
  }

  const embeddedEntryPlaceholders = container.querySelectorAll('[data-rich-text-entry]');
  for (const embeddedEntryPlaceholder of embeddedEntryPlaceholders)
  {
    const id = embeddedEntryPlaceholder.getAttribute('data-rich-text-id');
    if (!id)
    {
      (embeddedEntryPlaceholder as HTMLElement).style.color = 'red';
      embeddedEntryPlaceholder.innerHTML = 'data-rich-text-id not found';
      continue;
    }

    const entry = entryMap.get(id);
    if (!entry)
    {
      (embeddedEntryPlaceholder as HTMLElement).style.color = 'red';
      embeddedEntryPlaceholder.innerHTML = `Entry ${id} not found`;
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const type = (entry as any).__typename as string;
    if (type === 'CallToAction')
    {
      embeddedEntryPlaceholder.parentElement?.insertBefore(createCallToActionElement(entry as CallToAction), embeddedEntryPlaceholder);
      embeddedEntryPlaceholder.remove();
    }
    else if (type === 'ContactForm')
    {
      embeddedEntryPlaceholder.parentElement?.insertBefore(createContactFormElement(entry as ContactForm), embeddedEntryPlaceholder);
      embeddedEntryPlaceholder.remove();
    }
    else if (type === 'Hero')
    {
      embeddedEntryPlaceholder.parentElement?.insertBefore(createHeroElement(entry as Hero), embeddedEntryPlaceholder);
      embeddedEntryPlaceholder.remove();
    }
    else if (type === 'Services')
    {
      embeddedEntryPlaceholder.parentElement?.insertBefore(createServicesElement(entry as Services), embeddedEntryPlaceholder);
      embeddedEntryPlaceholder.remove();
    }
    else if (type === 'StepByStep')
    {
      embeddedEntryPlaceholder.parentElement?.insertBefore(createStepByStepElement(entry as StepByStep), embeddedEntryPlaceholder);
      embeddedEntryPlaceholder.remove();
    }
    else if (type === 'Testimonials')
    {
      embeddedEntryPlaceholder.parentElement?.insertBefore(createTestimonialsElement(entry as Testimonials), embeddedEntryPlaceholder);
      embeddedEntryPlaceholder.remove();
    }
    else
    {
      (embeddedEntryPlaceholder as HTMLElement).style.color = 'red';
      embeddedEntryPlaceholder.innerHTML = `Template for entry type ${type} not found`;
    }
  }

  return Array.from(container.children) as HTMLElement[];
};

const options: Options =
{
  renderNode:
  {
    [BLOCKS.EMBEDDED_ASSET]: node =>
    {
      return `<div data-rich-text-asset="" data-rich-text-id="${node.data.target.sys.id}"></div>`;
    },
    [BLOCKS.EMBEDDED_ENTRY]: node =>
    {
      return `<div data-rich-text-entry="" data-rich-text-id="${node.data.target.sys.id}"></div>`;
    },
    [INLINES.EMBEDDED_ENTRY]: node =>
    {
      return `<div data-rich-text-entry="" data-rich-text-id="${node.data.target.sys.id}" data-rich-text-inline=""></div>`;
    }
  }
};

export default createRichTextElements;
