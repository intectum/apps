import { NextPage } from 'next';

import { queryContentful } from '../../common/contentful';
import { PageQuery } from '../../common/queries';
import RichText from '../../components/RichText';

type Props =
{
  params:
  {
    slug: string[];
  };
};

const Page: NextPage<Props> = async ({ params: { slug } }) =>
{
  const path = `/${slug ? slug.join('/') : ''}`;
  const pages = await queryContentful(PageQuery, { path });

  const content = pages?.pageCollection?.items[0]?.content;
  if (!content)
  {
    return `Page content not found: ${path}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RichText document={content.json} links={content.links as any /* TODO */} />;
};

export default Page;
