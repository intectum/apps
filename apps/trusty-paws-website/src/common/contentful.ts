import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql/language/printer';

export const queryContentful = async <TResult, TVariables>(
  query: TypedDocumentNode<TResult, TVariables>,
  ...[ variables ]: TVariables extends Record<string, never> ? [] : [TVariables]
) =>
{
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}`,
    {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
      },
      body: JSON.stringify({ query: print(query), variables })
    }
  );

  const data = await response.json();

  if (data.errors)
  {
    console.error('Query has errors:', data.errors);
    return undefined;
  }

  return data.data as TResult;
};
