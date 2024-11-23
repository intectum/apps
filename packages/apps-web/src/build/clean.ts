import fs from 'fs';

export const clean = () =>
{
  fs.rmSync('dist', { recursive: true, force: true });
  fs.mkdirSync('dist');

  console.log('  cleaned   dist');
};
