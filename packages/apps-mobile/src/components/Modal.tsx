import { FC } from 'react';
import { Modal as ReactNativeModal, ModalProps, ViewStyle } from 'react-native';

import { Themeable } from 'apps-core';

import { styles } from '../styles';
import { useThemes } from '../themes';
import Container from './Container';
import Pressable from './Pressable';

export type Props = Themeable & ModalProps;

const Modal: FC<Props> = ({ theme, shade, children, ...modalProps }) =>
{
  const themes = useThemes(theme, shade);

  const backdropStyle: ViewStyle =
  {
    ...styles.flex1,
    ...styles.padding,
    backgroundColor: `${themes.monochrome.back}88`,
    justifyContent: 'center'
  };

  const containerStyle: ViewStyle =
  {
    ...styles.rounded,
    ...styles.padding
  };

  return (
    <ReactNativeModal
      animationType={modalProps.transparent ? 'fade' : 'slide'}
      {...modalProps}
    >
      {!modalProps.transparent &&
        <Container theme={theme} shade={shade} style={styles.flex1}>
          {children}
        </Container>
      }
      {modalProps.transparent &&
        <Pressable
          android_ripple={undefined}
          style={backdropStyle}
          onPress={event => event.currentTarget === event.target && modalProps.onRequestClose?.(event)}
        >
          <Container theme={theme} shade={shade} style={containerStyle}>
            {children}
          </Container>
        </Pressable>
      }
    </ReactNativeModal>
  );
};

export default Modal;
