import { Services } from '../graphql/types';

const renderServicesHTML = (services: Services) => `
  <div class="u-py--xl">
    <div class="u-container u-fc u-text-center">
      <h2 class="u-pb--xl">${services.title}</h2>
      <div class="u-fr u-gap">
        ${services.servicesCollection?.items.map(service => `
          <div class="u-fc u-gap">
            <h3>${service?.title}</h3>
            ${service?.description}
          </div>
        `).join('')}
      </div>
    </div>
  </div>
`;

export default renderServicesHTML;