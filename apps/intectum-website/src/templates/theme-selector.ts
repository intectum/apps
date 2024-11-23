import { intectumThemes } from 'apps-core';
import { mapToHTML } from 'apps-web';

const themeNames = Object.keys(intectumThemes);

const renderThemeSelectorHTML = () => `
  <div is="intectum-theme-selector" class="c-theme-selector u-fr u-gap u-align--center">
    <button type="button" class="c-button c-circle u-panel u-p--none" title="Modify theme" data-action="open-themes">
      <div class="c-circle c-circle--sm c-theme-selector__primary u-panel--middle"></div>
      <div class="c-circle c-circle--sm c-theme-selector__accent u-panel--accent"></div>
    </button>
    <button type="button" class="c-button c-circle u-panel u-p--none" title="Dark mode" data-action="toggle-dark-mode">
      <i class="fa-solid fa-moon u-icon"></i>
    </button>
    <div data-section="themes" class="c-theme-selector__backdrop" data-action="close-themes"></div>
    <div data-section="themes" class="c-theme-selector__dropdown u-panel--invert u-fr u-gap u-rounded u-p--sm">
      <div class="u-fc u-gap">
        ${mapToHTML(themeNames, themeName => `
          <button
            type="button"
            class="c-button c-circle u-panel--invert u-p--none"
            title="Primary color: ${themeName}"
            data-action="set-primary"
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
            data-action="set-accent"
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
