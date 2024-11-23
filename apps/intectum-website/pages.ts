import fs from 'fs';

import { default as renderHomePageHTML } from './src/templates/home/page';
import renderLayoutHTML from './src/templates/layout';
import { default as renderProjectsPageHTML } from './src/templates/projects/page';

export const buildPages = () =>
{
  const homePageHTML = renderHomePageHTML();
  fs.writeFileSync('dist/index.html', renderLayoutHTML(homePageHTML));
  fs.writeFileSync('dist/index.page.html', homePageHTML);
  console.log('  rendered  dist/index.html');

  const projectsPageHTML = renderProjectsPageHTML();
  fs.writeFileSync('dist/projects.html', renderLayoutHTML(projectsPageHTML));
  fs.writeFileSync('dist/projects.page.html', projectsPageHTML);
  console.log('  rendered  dist/projects.html');
};
