import { mapToHTML } from 'apps-web';

import { formatMonthYear } from '../common/dates';
import { Client, cvUrl } from '../common/types';

const renderClientDialogHTML = (client: Client) => `
  <dialog is="basis-dialog" class="u-panel--invert u-fc u-gap u-p">
    <div class="u-fc u-gap u-center">
      <img class="c-client-dialog__client-image" src="${client.iconUrl}" alt="${client.name}" />
      <div class="u-fr u-gap">
        <a is="basis-a" href="/projects?client=${client.slug}" title="Projects">
          <i class="fa-solid fa-folder-open u-icon"></i>
        </a>
        <a is="basis-a" href="${client.link.url}" title="${client.link.title ?? 'Website'}">
          <i class="fa-solid fa-arrow-up-right-from-square u-icon"></i>
        </a>
      </div>
      <div class="u-text-large">${client.position}</div>
    </div>
    ${client.description ? `<div class="u-show-md">${client.description}</div>` : ''}
    ${client.employmentType === 'contractor' ? '<h5>Contracts</h5>' : ''}
    ${client.employmentType === 'employee' ? '<h5>Employments</h5>' : ''}
    <div class="o-grid">
      ${mapToHTML(client.dates, dates => `
        <div class="c-tag u-m--xs">
          ${formatMonthYear(dates.startedAt)} - ${formatMonthYear(dates.endedAt)}
        </div>
      `)}
    </div>
    ${client.reference ? `
      <h5>Reference</h5>
      <p>
        ${client.reference}. See <a is="basis-a" href="${cvUrl}">my full CV</a> for contact details.
      </p>
    ` : ''}
  </dialog>
`;

export default renderClientDialogHTML;
