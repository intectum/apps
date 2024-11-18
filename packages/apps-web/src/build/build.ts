import * as esbuild from 'esbuild';

import options from './options';

console.log('staring build...');
process.env.NODE_ENV = 'production';
const startTime = performance.now();

import './clean';
import './static-files';

esbuild.build({
  ...options,
  minify: true
});

console.log('  bundled   dist/index.js');
console.log('  bundled   dist/index.css');
console.log(`build completed in ${Math.round(performance.now() - startTime)}ms`);
