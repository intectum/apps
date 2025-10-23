const renderDropdownOptionHTML = (key: string, value: string) =>
  `<button type="button" class="c-button c-button--plain u-justify--start" style="text-transform: none;" data-key="${key}">${value}</button>`;

export default renderDropdownOptionHTML;
