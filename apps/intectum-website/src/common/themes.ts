import { intectumThemes, Theme } from 'apps-core';

const themes: Record<string, Theme> =
{
  main:
  {
    ...intectumThemes.stone,
    accent: intectumThemes.water.accent
  },
  ...intectumThemes
};

export default themes;
