import { adaptThemes, createThemes, Shade, Theme, ThemeName, Themes } from 'apps-core';

export const useThemes = (current?: Theme | ThemeName, back?: Shade) =>
{
  const darkMode = !window.matchMedia?.('(prefers-color-scheme: light)').matches;
  const lightThemes = adaptThemes(createThemes(darkMode), current, back);

  for (const themeName of Object.keys(lightThemes) as [keyof Themes])
  {
    document.documentElement.style.setProperty(`--themes-${themeName}-light`, lightThemes[themeName].light);
    document.documentElement.style.setProperty(`--themes-${themeName}-medium`, lightThemes[themeName].medium);
    document.documentElement.style.setProperty(`--themes-${themeName}-dark`, lightThemes[themeName].dark);
    document.documentElement.style.setProperty(`--themes-${themeName}-bright`, lightThemes[themeName].bright);
    document.documentElement.style.setProperty(`--themes-${themeName}-front`, lightThemes[themeName].front);
    document.documentElement.style.setProperty(`--themes-${themeName}-back`, lightThemes[themeName].back);
  }
};
