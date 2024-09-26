import { FC, HTMLAttributes } from 'react';
import { classes } from 'apps-web';

const Logo: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...divProps }) =>
  <div className={classes([ 'c-logo', className ])} {...divProps}>
    <div>~</div>
    <div>~</div>
    <div>~</div>
  </div>;

export default Logo;
