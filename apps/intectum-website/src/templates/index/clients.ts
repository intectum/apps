import { mapToHTML } from 'apps-web';

import clients from '../../data/clients';

const activeClients = clients
  .filter(client => client.active)
  .sort((a, b) => a.name.localeCompare(b.name));

const renderClientsHTML = () => `
  <div is="intectum-home-clients" data-section="scroll-animation" class="c-home-clients u-container" style="--client-count: ${activeClients.length};">
    <div class="c-home-clients__body u-fr u-gap u-center u-m">
      <div class="c-circle c-home-clients__outer u-panel--middle u-scroll-animation u-fr u-center u-m">
        ${mapToHTML(activeClients, (client, index) => `
          <button
            type="button"
            class="c-home-clients__client u-scroll-animation u-p--none"
            style="--client-index: ${index};"
            data-action="open-client"
            data-client-slug="${client.slug}"
          >
            <img
              class="c-home-clients__client-image"
              src="${client.iconUrl}"
              alt="${client.name}"
              loading="lazy"
            />
          </button>
        `)}
        <div class="c-circle c-home-clients__inner u-panel--invert u-scroll-animation"></div>
      </div>
      <div class="c-home-clients__detail u-fc u-gap u-text-center u-m">
        <h2>Clients</h2>
        <!--div class="u-text-large">Trusted by my clients, many of whom I have partnered with on multiple contracts</div-->
        <blockquote>
          Loved working with Gyan. He is a great software engineer with a deep knowledge spanning multiple verticals
          across the space. Level-headed and pragmatic he takes on any challenge with confidence and a smile.
          Would recommend Gyan for any software endeavour.
        </blockquote>
        <div>- Logan Maire, Colenso BBDO</div>
      </div>
    </div>
  </div>
`;

export default renderClientsHTML;
