import renderDropdownHTML from './dropdown';

const renderAddressDropdownHTML = (initialValue: string) => `
  <div is="hm-address-dropdown">
    ${renderDropdownHTML('address', initialValue, {}, true, 'e.g. London')}
  </div>
`;

export default renderAddressDropdownHTML;
