import fs from 'node:fs';

import * as esbuild from 'esbuild';

import { env } from './env';

export const bundle = async (entryPoints: string[]) =>
{
  const result = await esbuild.build({
    entryPoints,
    outdir: 'dist',
    bundle: true,
    write: false,
    loader: { '.otf': 'dataurl', '.svg': 'dataurl', '.woff2': 'dataurl' },
    define: envToDefine(),
    sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : undefined,
    minify: process.env.NODE_ENV !== 'development'
  });

  return {
    js: result.outputFiles[0].text,
    css: result.outputFiles[1].text
  };
};

const envToDefine = () =>
{
  if (!fs.existsSync('.env')) return {};

  const envConfig = env(process.env.NODE_ENV !== 'production');
  if (!envConfig.parsed) return {};

  const define: Record<string, string> = {};
  for (const [ key, value ] of Object.entries(envConfig.parsed))
  {
    if (key.startsWith('PUBLIC_'))
    {
      define[`process.env.${key}`] = `'${value}'`;
    }
  }

  return define;
};
