import { FC } from 'react';

import { Size } from 'apps-core';

import { classes } from '../classes';
import Panel, { Props as PanelProps } from './Panel';

export type Props =
{
  size?: Size;
  highlight?: boolean;
} & PanelProps;

const Circle: FC<Props> = ({ theme = 'main', size, highlight, children, className, style, ...panelProps }) =>
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
    {highlight && <div className={classes([ 'c-circle__highlight', size && `c-circle__highlight--${size}` ])} />}
  </Panel>;

export default Circle;
