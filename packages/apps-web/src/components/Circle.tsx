import { FC, HTMLAttributes } from 'react';

import { Size, Themeable } from 'apps-core';

import { classes } from '../classes';
import Panel from './Panel';

export type Props =
{
  size?: Size;
  highlight?: boolean;
} & Themeable & HTMLAttributes<HTMLDivElement>;

const Circle: FC<Props> = ({ theme, shade, size, highlight, children, className, ...divProps }) =>
  <Panel
    theme={theme}
    shade={shade}
    className={classes([ 'c-circle', size && `c-circle--${size}`, className ])}
    {...divProps}
  >
    {children}
    {highlight && <div className={classes([ 'c-circle__highlight', size && `c-circle__highlight--${size}` ])} />}
  </Panel>;

export default Circle;
