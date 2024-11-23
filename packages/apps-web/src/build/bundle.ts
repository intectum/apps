import * as esbuild from 'esbuild';

import options from './options';

export const bundle = async () =>
{
  await esbuild.build({ ...options, minify: true });

  console.log('  bundled   dist/index.js');
  console.log('  bundled   dist/index.css');
};
