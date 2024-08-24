import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { classes } from '../classes';
import Icon from './Icon';

export interface Props extends HTMLAttributes<HTMLDivElement>
{
  onDismiss?: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = ({ children, onDismiss, className, ...divProps }) =>
{
  return (
    <div className="c-modal" onClick={onDismiss}>
      <div className={classes([ 'c-modal__window', className ])} onClick={event => event.stopPropagation()} {...divProps}>
        <button type="button" className="c-modal__close c-button c-button--circle" onClick={onDismiss}>
          <Icon icon="xmark"/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
