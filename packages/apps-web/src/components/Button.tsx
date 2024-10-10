import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, FC, PropsWithChildren } from 'react';

import { Size, Themed } from 'apps-core';

import { classes } from '../classes';
import Link from './Link';

type NextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

export type Props = {
  clear?: boolean;
  size?: Size;
  circle?: boolean;
  square?: boolean;
} & Themed & (NextLinkProps | ButtonHTMLAttributes<HTMLButtonElement>);

const Button: FC<PropsWithChildren<Props>> = ({ theme = 'main', shade, invert, clear, size, circle, square, ...elementProps }) =>
{
  const back = invert ? 'front' : (shade ?? 'back');
  const front = invert ? 'back' : (shade === 'front' ? 'back': 'front');

  const className = classes([
    'c-button',
    !circle && size && `c-button--${size}`,
    circle && 'c-circle',
    circle && size && `c-circle--${size}`,
    !circle && !square && 'u-rounded',
    elementProps.className
  ]);

  const style: CSSProperties = {
    backgroundColor: theme && (clear ? undefined : `var(--theme-${theme}-${back})`),
    color: theme && `var(--theme-${theme}-${front})`,
    ...elementProps.style
  };

  if ((elementProps as any).href)
  {
    const linkProps = elementProps as NextLinkProps;
    return <Link {...linkProps} className={className} style={style} />;
  }

  const buttonProps = elementProps as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type="button" {...buttonProps} className={className} style={style} />;
};

export default Button;
