'use client';

import { FC, HTMLAttributes } from 'react';

import { Themeable } from 'apps-core';

import { classes } from '../classes';
import { ThemeContext, useThemes, useThemeStyle } from '../themes';

export type Props = Themeable & HTMLAttributes<HTMLDivElement>;

const Panel: FC<Props> = ({ theme, shade, accent, className, style, ...divProps }) =>
{
  const themes = useThemes(theme, shade, accent);
  const themeStyle = useThemeStyle(themes);

  return (
    <ThemeContext.Provider value={themes}>
      <div
        className={classes([ 'c-panel', className ])}
        style={{ ...themeStyle, ...style }}
        {...divProps}
      />
    </ThemeContext.Provider>
  );
};

export default Panel;
