import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { Themed } from 'apps-core';

import { classes } from '../classes';
import Button from './Button';
import Icon from './Icon';
import Panel from './Panel';

export type Props = Themed & HTMLAttributes<HTMLDivElement> &
{
  onDismiss?: () => void;
};

const Modal: FC<PropsWithChildren<Props>> = ({ theme = 'main', shade, invert, children, onDismiss, className, ...divProps }) =>
  <div className="c-modal" onClick={onDismiss}>
    <Panel
      theme={theme}
      shade={shade}
      invert={invert}
      className={classes([ 'c-modal__window', className ])}
      onClick={event => event.stopPropagation()}
      {...divProps}
    >
      <Button theme={theme} invert={!invert} circle className="c-modal__close" title="Close" onClick={onDismiss}>
        <Icon icon={faXmark} />
      </Button>
      {children}
    </Panel>
  </div>;

export default Modal;
