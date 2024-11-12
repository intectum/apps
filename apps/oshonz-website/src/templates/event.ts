import { DateTime } from 'luxon';

import { getShortAddress } from '../common/data';
import { Event } from '../common/types';
import renderOSHOEventDialogHTML from './event-dialog';

const renderOSHOEventHTML = (event: Event) => `
  <div class="u-fc u-gap u-rounded u-invert u-p">
    <div>
      <h3 class="u-fc u-gap">
        ${event.summary}
        ${event.description.includes('CANCELLED') ? `
          <div class="u-danger">Sorry this meditation has been CANCELLED</div>
        ` : ''}
      </h3>
      <div>${getShortAddress(event.address)}</div>
      <div>${DateTime.fromISO(event.start).toFormat('EEEE, MMMM d @ h:mm a')}</div>
    </div>
    <div>
      <button is="osho-event-open" class="c-button u-rounded">
        Learn more
      </button>
      ${renderOSHOEventDialogHTML(event)}
    </div>
  </div>
`;

export default renderOSHOEventHTML;
