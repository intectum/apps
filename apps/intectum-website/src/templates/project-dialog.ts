import { mapToHTML } from 'apps-web';

import { Project } from '../common/types';
import skills from '../data/skills';

const renderProjectDialogHTML = (project: Project) =>
{
  const projectSkills = skills.filter(skill => project.skillSlugs.includes(skill.slug));

  return `
    <dialog is="intectum-project-dialog" class="u-panel--invert">
      <img
        class="c-project-dialog__header"
        src="${project.imageUrl}"
        alt="${project.name}"
      />
      <div class="u-fc u-gap u-p">
        <h3>${project.name}</h3>
        <div class="u-fr u-gap">
          ${project.clientSlug ? `
            <button
              type="button"
              title="Client"
              data-action="open-client"
              data-client-slug="${project.clientSlug}"
            >
              <i class="fa-solid fa-user-tie u-icon"></i>
            </button>
          ` : ''}
          ${mapToHTML(project.links, link => `
            <a is="basis-a" href="${link.url}" title="${link.title ?? 'Open'}">
              <i class="${link.icon ?? 'fa-solid fa-arrow-up-right-from-square'} u-icon"></i>
            </a>
          `)}
        </div>
        ${project.description ? `<div>${project.description}</div>` : ''}
        <div class="u-fr u-gap u-wrap">
          ${mapToHTML(projectSkills, skill => `<div class="c-skill">${skill.name}</div>`)}
        </div>
      </div>
    </dialog>
  `;
};

export default renderProjectDialogHTML;
