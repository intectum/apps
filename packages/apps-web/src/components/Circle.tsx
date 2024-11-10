import { FC } from 'react';

import { Size } from 'apps-core';

import { classes } from '../classes';
import Panel, { Props as PanelProps } from './Panel';

export type Props =
{
  size?: Size;
} & PanelProps;

const Circle: FC<Props> = ({ theme = 'main', size, children, className, style, ...panelProps }) =>
  <Panel
    theme={theme}
    className={classes([ 'c-circle', size && `c-circle--${size}`, className ])}
    style={{
      borderColor: `var(--theme-${theme}-accent)`,
      ...style
    }}
    {...panelProps}
  >
    {children}
  </Panel>;

export default Circle;
