import fs from 'fs';

export const copyStaticFiles = () =>
{
  fs.cpSync('static', 'dist', { recursive: true });

  console.log('  copied    dist/*static files*');
};
