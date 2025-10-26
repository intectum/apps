import * as esbuild from 'esbuild';

import fs from 'fs';
import * as dotenv from 'dotenv';

export const bundle = async (production?: boolean) =>
{
  const result = await esbuild.build({
    entryPoints: [ 'src/app/index.ts', 'src/app/index.css' ],
    outdir: 'dist',
    bundle: true,
    write: false,
    loader: { '.svg': 'dataurl', '.woff2': 'dataurl' },
    define: envToDefine(),
    sourcemap: production ? undefined : 'inline',
    minify: production
  });

  return {
    js: result.outputFiles[0].text,
    css: result.outputFiles[1].text
  };
};

const envToDefine = () =>
{
  if (!fs.existsSync('.env')) return {};

  const env = dotenv.config();
  if (!env.parsed) return {};

  const define: Record<string, string> = {};
  for (const key of Object.keys(env.parsed))
  {
    if (key.startsWith('PUBLIC_'))
    {
      define[`process.env.${key}`] = `'${env.parsed[key]}'`;
    }
  }

  return define;
};
