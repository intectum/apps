import fs from 'fs';

fs.cpSync('src/index.html', 'dist/index.html');

console.log('  copied    dist/index.html');

fs.cpSync('src/manifest.json', 'dist/manifest.json');

console.log('  copied    dist/manifest.json');

fs.cpSync('src/images', 'dist/images', { recursive: true });

console.log('  copied    dist/images');
