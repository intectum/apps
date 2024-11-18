import * as esbuild from 'esbuild';

import options from './options';

console.log('staring dev...');

import './clean';
import './static-files';

esbuild.context({
  ...options,
  sourcemap: 'linked',
}).then(context =>
{
  console.log('  bundled   dist/index.js');
  console.log('  bundled   dist/index.css');

  context.watch();
  context.serve({ servedir: 'dist', port: 5551 });

  console.log('dev running at http://localhost:5551');
  console.log('  watching  src/index.ts and its dependencies...');
  console.log('  watching  src/index.css and its dependencies...');
});
