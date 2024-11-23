import { queryContentful } from '../common/contentful';
import { PageQuery } from '../common/queries';
import { PageContentLinks } from '../graphql/types';
import renderRichTextHTML from '../templates/rich-text';

const renderPageHTML = async (path: string) =>
{
  const pages = await queryContentful(PageQuery, { path });

  const content = pages?.pageCollection?.items[0]?.content;
  if (!content)
  {
    return `Page content not found for path '${path}'`;
  }

  return renderRichTextHTML(content.json, content.links as PageContentLinks);
};

export default renderPageHTML;
