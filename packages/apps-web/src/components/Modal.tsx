import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { Themeable } from 'apps-core';

import { classes } from '../classes';
import Button from './Button';
import Icon from './Icon';
import Panel from './Panel';

export type Props = Themeable & HTMLAttributes<HTMLDivElement> &
{
  onDismiss?: () => void;
};

const Modal: FC<PropsWithChildren<Props>> = ({ theme, shade, accent, children, onDismiss, className, ...divProps }) =>
  <div className="c-modal" onClick={onDismiss}>
    <Panel
      theme={theme}
      shade={shade}
      accent={accent}
      className={classes([ 'c-modal__window', className ])}
      onClick={event => event.stopPropagation()}
      {...divProps}
    >
      <Button circle className="c-modal__close" onClick={onDismiss}>
        <Icon icon={faXmark} />
      </Button>
      {children}
    </Panel>
  </div>;

export default Modal;
