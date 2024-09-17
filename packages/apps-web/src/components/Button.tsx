'use client';

import { ButtonHTMLAttributes, FC, PropsWithChildren, useContext } from 'react';

import { Size, Themeable } from 'apps-core';

import { classes } from '../classes';
import { ThemeContext, useThemeStyle } from '../themes';

export type Props =
{
  clear?: boolean;
  circle?: Size | boolean;
  square?: boolean;
} & Themeable & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<PropsWithChildren<Props>> = ({ theme, shade, invert, clear, circle, square, children, className, style, ...buttonProps }) =>
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
      <button
        type="button"
        className={classes([
          'c-button',
          circle && 'c-circle',
          typeof circle === 'string' && `c-circle--${circle}`,
          !circle && !square && 'u-rounded',
          className
        ])}
        style={{
          ...themeStyle,
          backgroundColor: clear ? undefined : 'var(--theme-back)',
          ...style
        }}
        {...buttonProps}
      >
        {children}
      </button>
    </ThemeContext.Provider>
  );
};

export default Button;
