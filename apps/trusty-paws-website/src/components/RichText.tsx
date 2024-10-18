import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import { FC } from 'react';

import CallToAction from '../components/CallToAction';
import ContactForm from '../components/ContactForm';
import Hero from '../components/Hero';
import Services from '../components/Services';
import StepByStep from '../components/StepByStep';
import Testimonials from '../components/Testimonials';
import {
  CallToAction as CallToActionType,
  ContactForm as ContactFormType,
  Hero as HeroType,
  PageContentLinks,
  Services as ServicesType,
  StepByStep as StepByStepType,
  Testimonials as TestimonialsType
} from '../graphql/types';

type Props =
{
  document: Document;
  links?: PageContentLinks;
};

const RichText: FC<Props> = ({ document, links }) =>
{
  const assetMap = new Map();
  const entryMap = new Map();

  if (links)
  {
    for (const asset of links.assets.block)
    {
      assetMap.set(asset?.sys.id, asset);
    }

    for (const entry of links.entries.block)
    {
      entryMap.set(entry?.sys.id, entry);
    }
    for (const entry of links.entries.inline)
    {
      entryMap.set(entry?.sys.id, entry);
    }
  }

  const options: Options =
  {
    renderNode:
    {
      [BLOCKS.EMBEDDED_ASSET]: node =>
      {
        const asset = assetMap.get(node.data.target.sys.id);
        return <img src={asset.url} alt={asset.title} />;
      },
      [BLOCKS.EMBEDDED_ENTRY]: node =>
      {
        const entry = entryMap.get(node.data.target.sys.id);
        if (entry.__typename === 'CallToAction')
        {
          return <CallToAction callToAction={entry as CallToActionType} />;
        }
        else if (entry.__typename === 'ContactForm')
        {
          return <ContactForm contactForm={entry as ContactFormType} />;
        }
        else if (entry.__typename === 'Hero')
        {
          return <Hero hero={entry as HeroType} />;
        }
        else if (entry.__typename === 'Services')
        {
          return <Services services={entry as ServicesType} />;
        }
        else if (entry.__typename === 'StepByStep')
        {
          return <StepByStep stepByStep={entry as StepByStepType} />;
        }
        else if (entry.__typename === 'Testimonials')
        {
          return <Testimonials testimonials={entry as TestimonialsType} />;
        }
        else
        {
          return <div style={{ color: 'red' }}>Component not found for entry '{entry.__typename}'</div>;
        }
      },
      [INLINES.EMBEDDED_ENTRY]: node =>
      {
        const entry = entryMap.get(node.data.target.sys.id);
        return <div style={{ color: 'red' }}>Component not found for entry '{entry.__typename}'</div>;
      }
    }
  };

  return documentToReactComponents(document, options);
};

export default RichText;
