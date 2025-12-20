import { intectumThemes } from 'apps-core';
import { mapToHTML } from 'based';

import renderSunSvg from '../icons/sun';

const themeNames = Object.keys(intectumThemes);

const renderThemeSelectorHTML = () => `
  <div data-name="theme-selector" class="c-theme-selector u-fr u-gap u-align--center">
    <button type="button" class="c-button c-circle u-panel u-p--none" title="Modify theme" data-name="open">
      <div class="c-circle c-circle--sm c-theme-selector__primary u-panel--middle"></div>
      <div class="c-circle c-circle--sm c-theme-selector__accent u-panel--accent"></div>
    </button>
    <button type="button" class="c-button c-circle u-panel u-p--none" title="Dark mode" data-name="toggle-dark-mode">
      ${renderSunSvg()}
    </button>
    <div data-openable="" class="c-theme-selector__backdrop" data-name="close" style="display: none;"></div>
    <div data-openable="" class="c-theme-selector__dropdown u-panel--invert u-fr u-gap u-rounded u-p--sm" style="display: none;">
      <div class="u-fc u-gap">
        ${mapToHTML(themeNames, themeName => `
          <button
            type="button"
            class="c-button c-circle u-panel--invert u-p--none"
            title="Primary color: ${themeName}"
            data-name="primary"
            data-theme-name="${themeName}"
          >
            <div
              class="c-circle c-theme-selector__primary u-panel--middle"
              style="background-color: ${intectumThemes[themeName].middle};"
            ></div>
          </button>
        `)}
      </div>
      <div class="u-fc u-gap">
        ${mapToHTML(themeNames, themeName => `
          <button
            type="button"
            class="c-button c-circle u-panel--invert u-p--none"
            title="Accent color: ${themeName}"
            data-name="accent"
            data-theme-name="${themeName}"
          >
            <div
              class="c-circle c-theme-selector__accent u-panel--accent"
              style="background-color: ${intectumThemes[themeName].accent};"
            ></div>
          </button>
        `)}
      </div>
    </div>
  </div>
`;

export default renderThemeSelectorHTML;
