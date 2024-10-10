import { FC } from 'react';

import { shades, Theme } from 'apps-core';

export type Props =
{
  theme?: string;
  themes: Record<string, Theme>;
}

const ThemeStyle: FC<Props> = ({ theme = 'main', themes }) =>
{
  const toVarString = (name: string, theme: Theme) =>
  {
    const vars: string[] = [];

    for (const shade of shades)
    {
      vars.push(`--theme-${name}-${shade}: ${theme[shade]};`);
    }

    return vars.join(' ');
  };

  return (
    <style>
      {`:root
      {
        ${Object.entries(themes).map(([ name, theme ]) => toVarString(name, theme)).join(' ')}
      }

      body
      {
        background-color: var(--theme-${theme}-back);
        color: var(--theme-${theme}-front);
      }`}
    </style>
  );
};

export default ThemeStyle;
