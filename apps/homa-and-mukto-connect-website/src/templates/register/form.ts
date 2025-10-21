import renderAddressDropdownHTML from '../address-dropdown';
import renderFolderOpenSvg from '../icons/folder-open';
import renderPlusSvg from '../icons/plus';
import renderContactRowHTML from './contact-row';
import renderGroupRowHTML from './group-row';

const renderFormHTML = () => `
  <form is="hm-register-form" class="u-fc u-gap--lg">
    <div class="u-fc u-gap--sm">
      <label for="email">Email</label>
      <input name="email" type="email" required="" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="password">Password</label>
      <input name="password" type="password" required="" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="name">Name</label>
      <input name="name" required="" />
    </div>
    <div class="u-fc u-gap--sm">
      <label for="image">Photo</label>
      <div class="u-fr u-justify--center">
        <button type="button" class="u-rounded--full u-aspect--1 u-bg-aqua" style="width: 128px;" data-action="image-open">
          <img data-name="image" alt="Me" class="u-rounded--full u-aspect--1 u-bg-aqua" style="width: 128px; display: none; object-fit: cover;" />
          ${renderFolderOpenSvg()}
        </button>
      </div>
      <input name="image" type="file" required="" />
    </div>
    <div class="u-fc u-gap--sm">
      <div>
        <label for="address">Location</label>
        <div class="u-text-small">Where can people find you?</div>
      </div>
      ${renderAddressDropdownHTML('')}
    </div>
    <div class="u-fc u-gap" data-name="contacts">
      <div>
        <label>Contact details</label>
        <div class="u-text-small">How can people get in touch with you?</div>
      </div>
      ${renderContactRowHTML(undefined, 0)}
      <div class="u-fr--reversed">
        <button type="button" class="c-button c-button--icon" data-action="add-contact">
          ${renderPlusSvg()}
        </button>
      </div>
    </div>
    <div class="u-fc u-gap" data-name="groups">
      <label>Groups attended</label>
      ${renderGroupRowHTML(undefined, 0)}
      <div class="u-fr--reversed">
        <button type="button" class="c-button c-button--icon" data-action="add-group">
          ${renderPlusSvg()}
        </button>
      </div>
    </div>
    <div class="u-fr u-justify--center">
      <button class="c-button c-button--primary">Register</button>
    </div>
  </form>
`;

export default renderFormHTML;
