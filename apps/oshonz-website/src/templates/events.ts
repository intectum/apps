import { Event } from '../common/types';
import renderOSHOEventHTML from './event';

const renderOSHOEventsHTML = (events: Event[]) => `
  <div class="u-f1">
    <div class="u-fc u-gap">
      ${events.map(event => renderOSHOEventHTML(event)).join('')}
    </div>
  </div>
  <div class="u-f1">
    <div data-section="map" class="u-aspect--16-9"></div>
  </div>
`;

export default renderOSHOEventsHTML;
