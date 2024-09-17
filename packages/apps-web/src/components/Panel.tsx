'use client';

import { FC, HTMLAttributes, useContext } from 'react';

import { Themeable } from 'apps-core';

import { classes } from '../classes';
import { ThemeContext, useThemeStyle } from '../themes';

export type Props = Themeable & HTMLAttributes<HTMLDivElement>;

const Panel: FC<Props> = ({ theme, shade, invert, className, style, ...divProps }) =>
{
  const themeContext = useContext(ThemeContext);
  const themeStyle = useThemeStyle(theme, shade, invert);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme ?? themeContext.theme,
        shade: shade === 'unset' ? undefined : shade ?? themeContext.shade,
        darkMode: invert ? !themeContext.darkMode : themeContext.darkMode,
        setDarkMode: themeContext.setDarkMode
      }}
    >
      <div
        className={classes([ 'c-panel', className ])}
        style={{ ...themeStyle, ...style }}
        {...divProps}
      />
    </ThemeContext.Provider>
  );
};

export default Panel;
