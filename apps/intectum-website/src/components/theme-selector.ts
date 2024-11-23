import { intectumThemes, Theme } from 'apps-core';

export class ThemeSelector extends HTMLDivElement
{
  connectedCallback()
  {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.setDarkMode(darkModeQuery.matches);
    darkModeQuery.addEventListener('change', event => this.setDarkMode(event.matches));

    const themesAll = this.querySelectorAll<HTMLElement>('[data-section="themes"]');
    for (const themes of themesAll)
    {
      themes.style.display = 'none';
    }

    const openThemes = this.querySelector<HTMLButtonElement>('[data-action="open-themes"]');
    if (openThemes)
    {
      openThemes.onclick = () =>
      {
        for (const themes of themesAll)
        {
          themes.style.display = '';
        }
      };
    }

    const toggleDarkMode = this.querySelector<HTMLButtonElement>('[data-action="toggle-dark-mode"]');
    if (toggleDarkMode)
    {
      toggleDarkMode.onclick = () =>
      {
        const colorSchemeManual = document.body.style.getPropertyValue('color-scheme') !== 'light dark';
        const darkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const darkModeExplicit = document.body.style.getPropertyValue('color-scheme') === 'dark';
        const darkMode = colorSchemeManual ? !darkModeExplicit : !darkModePreferred;

        document.body.style.setProperty('color-scheme', darkMode ? 'dark' : 'light');
        this.setDarkMode(darkMode);
      };
    }

    const closeThemes = this.querySelector<HTMLButtonElement>('[data-action="close-themes"]');
    if (closeThemes)
    {
      closeThemes.onclick = () =>
      {
        for (const themes of themesAll)
        {
          themes.style.display = 'none';
        }
      };
    }

    const setPrimaryAll = this.querySelectorAll<HTMLElement>('[data-action="set-primary"]');
    for (const setPrimary of setPrimaryAll)
    {
      setPrimary.onclick = () => this.setPrimary(setPrimary.getAttribute('data-theme-name') ?? '');
    }

    const setAccentAll = this.querySelectorAll<HTMLElement>('[data-action="set-accent"]');
    for (const setAccent of setAccentAll)
    {
      setAccent.onclick = () => this.setAccent(setAccent.getAttribute('data-theme-name') ?? '');
    }
  }

  setDarkMode(darkMode: boolean)
  {
    document.body.classList.toggle('u-dark-mode', darkMode);

    const toggleDarkMode = this.querySelector<HTMLButtonElement>('[data-action="toggle-dark-mode"]');
    if (!toggleDarkMode) return;

    toggleDarkMode.title = `${darkMode ? 'Light' : 'Dark'} mode`;
    toggleDarkMode.innerHTML = `<i class="fa-solid ${darkMode ? 'fa-moon' : 'fa-sun'} u-icon"></i>`;
  }

  setPrimary(themeName: string)
  {
    const theme = intectumThemes[themeName] as Theme | undefined;
    if (!theme) return;

    document.body.style.setProperty('--color-back', `light-dark(${theme.back}, ${theme.front})`);
    document.body.style.setProperty('--color-middle', theme.middle);
    document.body.style.setProperty('--color-front', `light-dark(${theme.front}, ${theme.back})`);
  }

  setAccent(themeName: string)
  {
    const theme = intectumThemes[themeName] as Theme | undefined;
    if (!theme) return;

    document.body.style.setProperty('--color-accent', theme.accent);
  }
}

export const defineThemeSelector = () =>
  customElements.define('intectum-theme-selector', ThemeSelector, { extends: 'div' });
