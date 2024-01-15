import { FC, useEffect, useRef, useState } from 'react';
import { Animated, LayoutRectangle, Modal, ModalProps, ViewStyle } from 'react-native';

import { styles } from '../styles';
import Pressable from './Pressable';

export interface Props extends ModalProps
{
  anchorLayoutInWindow?: LayoutRectangle;
  anchorX?: 'left' | 'right';
  anchorY?: 'top' | 'bottom';
}

const SlideDown: FC<Props> = ({ anchorLayoutInWindow, anchorX, anchorY, children, ...modalProps }) =>
{
  const topRef = useRef(new Animated.Value(0));
  const [ initialized, setInitialized ] = useState(false);
  const [ slideDownLayout, setSlideDownLayout ] = useState<LayoutRectangle>();

  useEffect(() =>
  {
    if (!anchorLayoutInWindow || !slideDownLayout)
    {
      return;
    }

    const anchorTop = anchorLayoutInWindow?.y ?? 0;
    const anchorBottom = anchorTop + (anchorLayoutInWindow?.height ?? 0);
    const top = anchorY === 'bottom' ? anchorBottom : anchorTop;

    if (!initialized)
    {
      topRef.current.setValue(top - slideDownLayout.height);
      setInitialized(true);
    }

    Animated.spring(
      topRef.current,
      {
        toValue: top - (modalProps.visible ? 0 : slideDownLayout.height),
        useNativeDriver: false
      }
    ).start();
  }, [ anchorLayoutInWindow, anchorY, initialized, modalProps.visible, slideDownLayout ]);

  const backdropStyle: ViewStyle =
  {
    ...styles.flex1,
    alignItems: 'flex-start'
  };

  const anchorLeft = anchorLayoutInWindow?.x ?? 0;
  const anchorRight = anchorLeft + (anchorLayoutInWindow?.width ?? 0);
  const slideDownWidth = slideDownLayout?.width ?? 0;

  const slideInStyle: ViewStyle =
  {
    left: anchorX === 'right' ? anchorRight - slideDownWidth : anchorLeft,
    top: topRef.current
  };

  return (
    <Modal
      transparent
      animationType="fade"
      {...modalProps}
    >
      <Pressable
        android_ripple={undefined}
        style={backdropStyle}
        onPress={event => modalProps.onRequestClose?.(event)}
      >
        <Animated.View
          style={slideInStyle}
          onLayout={event => setSlideDownLayout(event.nativeEvent.layout)}
        >
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default SlideDown;
