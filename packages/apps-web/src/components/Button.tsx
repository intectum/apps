'use client';

import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import { Size, Themeable } from 'apps-core';

import { classes } from '../classes';
import { ThemeContext, useThemes, useThemeStyle } from '../themes';

export type Props =
{
  clear?: boolean;
  circle?: Size | boolean;
  square?: boolean;
} & Themeable & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<PropsWithChildren<Props>> = ({ theme, shade, clear, circle, square, children, className, style, ...buttonProps }) =>
{
  const themes = useThemes(theme, buttonProps.disabled ? 'medium' : shade);
  const themeStyle = useThemeStyle(themes);

  return (
    <ThemeContext.Provider value={themes}>
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
