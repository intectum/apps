import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig =
{
  schema:
  [
    {
      [`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}`]:
      {
        headers:
        {
          Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}`
        }
      }
    }
  ],
  documents: [ 'src/common/queries.ts' ],
  generates:
  {
    './src/graphql/':
    {
      preset: 'client'
    },
    './src/graphql/types.ts': {
      plugins: [ 'typescript' ]
    },
    './schema.graphql':
    {
      plugins: [ 'schema-ast' ]
    }
  }
};

export default config;
