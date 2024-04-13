import { useThemes } from 'apps-web';
import { stoneBlue } from 'vaga-core';

const darkMode = !window.matchMedia?.('(prefers-color-scheme: light)').matches;

useThemes(stoneBlue(darkMode));
