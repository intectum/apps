import renderFolderOpenSvg from '../../../icons/folder-open';

const renderImageControlHTML = (initialValue?: string) => `
  <div data-init="image-control">
    <div class="u-fr u-justify--center">
      <button data-name="image-open" type="button" class="u-rounded--full u-aspect--1 u-bg-aqua" style="width: 128px;">
        <img data-name="image" src="${initialValue}" alt="Me" class="u-rounded--full u-aspect--1 u-bg-aqua" style="width: 128px; display: ${initialValue ? 'block' : 'none'}; object-fit: cover;" />
        ${initialValue ? '' : renderFolderOpenSvg()}
      </button>
    </div>
    <input name="image" type="file" ${initialValue ? '' : 'required=""'} />
  </div>
`;

export default renderImageControlHTML;
