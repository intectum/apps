import { Event } from '../../common/types';
import { getInstructionUrl, getShortAddress } from '../../common/data';
import { DateTime } from 'luxon';

const renderOSHOEventDialogHTML = (event: Event) =>
{
  const instructionsUrl = getInstructionUrl(event.summary);
  const description = event.description
    .replace('CANCELLED', '')
    .trim()
    .replace(/\n/g, '<br>');

  return `
    <dialog is="basis-dialog" data-event-dialog="" class="u-rounded">
      <div class="u-fc u-gap u-p">
        <h3 class="u-fc u-gap">
          ${event.summary}
          ${event.description.includes('CANCELLED') ? `
            <div class="u-danger">Sorry this meditation has been CANCELLED</div>
          ` : ''}
        </h3>
        <div>
          ${getShortAddress(event.address)} (<a is="basis-a" href="https://www.google.com/maps?q=${encodeURIComponent(event.address)}">open map</a>)
        </div>
        <div>${DateTime.fromISO(event.start).toFormat('EEEE, MMMM d @ h:mm a')}</div>
        ${instructionsUrl ? `<a is="basis-a" href="${instructionsUrl}">Read the full instructions here</a>` : ''}
        ${description ? `<div>${description}</div>` : ''}
      </div>
    </dialog>
  `;
};

export default renderOSHOEventDialogHTML;
