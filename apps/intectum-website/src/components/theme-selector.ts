import { intectumThemes, Theme } from 'apps-core';

class ThemeSelector extends HTMLDivElement
{
  private darkMode = true;

  connectedCallback()
  {
    this.setPrimary('stone');
    this.setAccent('water');

    if (window.matchMedia?.('(prefers-color-scheme: light)').matches)
    {
      this.toggleDarkMode();
    }

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
      toggleDarkMode.onclick = () => this.toggleDarkMode();
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

  toggleDarkMode()
  {
    this.darkMode = !this.darkMode;

    const back = document.body.style.getPropertyValue('--color-back');
    const front = document.body.style.getPropertyValue('--color-front');
    document.body.classList.toggle('u-dark-mode', this.darkMode);
    document.body.style.setProperty('--color-back', front);
    document.body.style.setProperty('--color-front', back);

    const toggleDarkMode = this.querySelector<HTMLButtonElement>('[data-action="toggle-dark-mode"]');
    if (!toggleDarkMode) return;

    toggleDarkMode.title = `${this.darkMode ? 'Light' : 'Dark'} mode`;
    toggleDarkMode.innerHTML = `<i class="fa-solid ${this.darkMode ? 'fa-moon' : 'fa-sun'} u-icon"></i>`;
  }

  setPrimary(themeName: string)
  {
    const theme = intectumThemes[themeName] as Theme | undefined;
    if (!theme) return;

    document.body.style.setProperty('--color-back', this.darkMode ? theme.front : theme.back);
    document.body.style.setProperty('--color-middle', theme.middle);
    document.body.style.setProperty('--color-front', this.darkMode ? theme.back : theme.front);
  }

  setAccent(themeName: string)
  {
    const theme = intectumThemes[themeName] as Theme | undefined;
    if (!theme) return;

    document.body.style.setProperty('--color-accent', theme.accent);
  }
}

customElements.define('theme-selector', ThemeSelector, { extends: 'div' });
