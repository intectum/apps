import fs from 'fs';

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');

console.log('  cleaned   dist');
