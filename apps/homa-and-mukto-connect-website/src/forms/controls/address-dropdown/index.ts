import renderDropdownControlHTML from '../dropdown';

const renderAddressDropdownControlHTML = (initialValue: string) => `
  <div is="hm-address-dropdown">
    ${renderDropdownControlHTML('address', initialValue, {}, true, 'e.g. London')}
  </div>
`;

export default renderAddressDropdownControlHTML;
