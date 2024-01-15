import { FC, PropsWithChildren } from 'react';

interface Props
{
  onDismiss?: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = ({ children, onDismiss }) =>
{
  return (
    <div className="c-modal" onClick={onDismiss}>
      <div className="o-container">
        <div className="c-modal__window" onClick={event => event.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
