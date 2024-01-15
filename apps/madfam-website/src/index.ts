import { useThemes } from 'apps-web';
import { stoneBlue } from 'madfam-core';

const darkMode = !window.matchMedia?.('(prefers-color-scheme: light)').matches;

useThemes(stoneBlue(darkMode));
