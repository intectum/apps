import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { classes } from '../classes';
import Button from './Button';
import Icon from './Icon';
import Panel from './Panel';

export interface Props extends HTMLAttributes<HTMLDivElement>
{
  onDismiss?: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = ({ children, onDismiss, className, ...divProps }) =>
  <div className="c-modal" onClick={onDismiss}>
    <Panel shade="front" className={classes([ 'c-modal__window', className ])} onClick={event => event.stopPropagation()} {...divProps}>
      <Button circle className="c-modal__close" onClick={onDismiss}>
        <Icon icon={faXmark} />
      </Button>
      {children}
    </Panel>
  </div>;

export default Modal;
