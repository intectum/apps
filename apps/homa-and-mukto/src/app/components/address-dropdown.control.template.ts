import renderDropdownControlHTML from './dropdown.control.template';

const renderAddressDropdownControlHTML = (initialValue: string) => `
  <div data-init="address-dropdown-control">
    ${renderDropdownControlHTML('address', initialValue, [], true, 'e.g. London')}
  </div>
`;

export default renderAddressDropdownControlHTML;
