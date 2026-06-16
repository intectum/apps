import renderFolderOpenSvg from '../icons/folder-open';

const renderImageControlHTML = (initialValue?: string) => `
  <div data-init="image-control">
    <div class="u-fc u-align--center">
      <button data-name="image-open" type="button" class="u-rounded u-aspect--1 u-bg-blue-light" style="width: 200px;">
        <img data-name="image" src="${initialValue ?? ''}" alt="Me" class="u-rounded u-aspect--1 u-bg-blue-light" style="width: 200px; display: ${initialValue ? 'block' : 'none'}; object-fit: cover;" />
        ${initialValue ? '' : `
          ${renderFolderOpenSvg()}
          <div>Choose a photo</div>
        `}
      </button>
      <input id="image" name="image" type="file" ${initialValue ? '' : 'required=""'} accept="image/jpeg, image/png" />
    </div>
  </div>
`;

export default renderImageControlHTML;
