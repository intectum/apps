import { intectumThemes, Theme } from 'apps-core';
import { init } from 'based/client';

import renderMoonSvg from '../icons/moon';
import renderSunSvg from '../icons/sun';

init['[data-name="theme-selector"]'] = element =>
{
  const setDarkMode = (darkMode: boolean) =>
  {
    document.body.classList.toggle('u-dark-mode', darkMode);

    const toggleDarkMode = element.querySelector<HTMLButtonElement>('[data-action="toggle-dark-mode"]');
    if (!toggleDarkMode) return;

    toggleDarkMode.title = `${darkMode ? 'Light' : 'Dark'} mode`;
    toggleDarkMode.innerHTML = darkMode ? renderMoonSvg() : renderSunSvg();
  };

  const setPrimary = (themeName: string) =>
  {
    const theme = intectumThemes[themeName] as Theme | undefined;
    if (!theme) return;

    document.body.style.setProperty('--color-back', `light-dark(${theme.back}, ${theme.front})`);
    document.body.style.setProperty('--color-middle', theme.middle);
    document.body.style.setProperty('--color-front', `light-dark(${theme.front}, ${theme.back})`);
  };

  const setAccent = (themeName: string) =>
  {
    const theme = intectumThemes[themeName] as Theme | undefined;
    if (!theme) return;

    document.body.style.setProperty('--color-accent', theme.accent);
  };

  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', event => setDarkMode(event.matches));

  setDarkMode(darkModeQuery.matches);

  const openableAll = element.querySelectorAll<HTMLElement>('[data-openable]');

  const openThemes = element.querySelector<HTMLButtonElement>('[data-name="open"]');
  if (openThemes)
  {
    openThemes.onclick = () =>
    {
      for (const openable of openableAll)
      {
        openable.style.display = '';
      }
    };
  }

  const toggleDarkMode = element.querySelector<HTMLButtonElement>('[data-name="toggle-dark-mode"]');
  if (toggleDarkMode)
  {
    toggleDarkMode.onclick = () =>
    {
      const colorSchemeManual = document.body.style.getPropertyValue('color-scheme') !== 'light dark';
      const darkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const darkModeExplicit = document.body.style.getPropertyValue('color-scheme') === 'dark';
      const darkMode = colorSchemeManual ? !darkModeExplicit : !darkModePreferred;

      document.body.style.setProperty('color-scheme', darkMode ? 'dark' : 'light');
      setDarkMode(darkMode);
    };
  }

  const closeThemes = element.querySelector<HTMLButtonElement>('[data-name="close"]');
  if (closeThemes)
  {
    closeThemes.onclick = () =>
    {
      for (const openable of openableAll)
      {
        openable.style.display = 'none';
      }
    };
  }

  const primaryAll = element.querySelectorAll<HTMLElement>('[data-name="primary"]');
  for (const primary of primaryAll)
  {
    primary.onclick = () => setPrimary(primary.dataset.themeName ?? '');
  }

  const accentAll = element.querySelectorAll<HTMLElement>('[data-name="accent"]');
  for (const accent of accentAll)
  {
    accent.onclick = () => setAccent(accent.dataset.themeName ?? '');
  }
};
