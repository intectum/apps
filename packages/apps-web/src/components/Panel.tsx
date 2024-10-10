import { FC, HTMLAttributes } from 'react';

import { Themed } from 'apps-core';

import { classes } from '../classes';

export type Props = Themed & HTMLAttributes<HTMLDivElement>;

const Panel: FC<Props> = ({ theme = 'main', shade, invert, className, style, ...divProps }) =>
{
  const back = invert ? 'front' : (shade ?? 'back');
  const front = invert ? 'back' : (shade === 'front' ? 'back': 'front');

  return (
    <div
      className={classes([ 'o-panel', className ])}
      style={{
        backgroundColor: theme && `var(--theme-${theme}-${back})`,
        color: theme && `var(--theme-${theme}-${front})`,
        ...style
      }}
      {...divProps}
    />
  );
};

export default Panel;
