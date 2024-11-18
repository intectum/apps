import fs from 'fs';

import * as dotenv from 'dotenv';
import { BuildOptions } from 'esbuild';

const envToDefine = () =>
{
  if (!fs.existsSync('.env')) return {};

  const env = dotenv.config();
  if (!env.parsed) return {};

  const define: Record<string, string> = {};
  for (const key of Object.keys(env.parsed))
  {
    define[`process.env.${key}`] = `'${env.parsed[key]}'`;
  }

  return define;
};

const options: BuildOptions =
{
  entryPoints: [ 'src/index.ts', 'src/index.css' ],
  outdir: 'dist',
  bundle: true,
  external: [ '*.svg' ],
  define: envToDefine()
};

export default options;
