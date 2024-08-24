import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Animated, View, ViewStyle } from 'react-native';

import { Themeable } from 'apps-core';

import { useDimensions } from '../dimensions';
import { useVerticalPanSnapper } from '../pan-snapper';
import { rounding, spacing, styles } from '../styles';
import { useThemes } from '../themes';
import Container from './Container';

export interface Props extends Themeable
{
  snapOffsets: number[];
  initialSnapIndex: number;
  onSnap?: (snapIndex: number) => void;
  onClose?: () => void;
}

const Drawer: FC<PropsWithChildren<Props>> = ({ theme, shade, snapOffsets, initialSnapIndex, onSnap, onClose, children }) =>
{
  const handleHeight = spacing.medium * 2 + 4;

  const [ initialized, setInitialized ] = useState(false);

  const { windowDimensions } = useDimensions();

  const finalSnapOffsets = [ ...snapOffsets, windowDimensions.height + handleHeight ];
  const onSnapFinal = (snapIndex : number) =>
  {
    if (initialized)
    {
      if (snapIndex === finalSnapOffsets.length - 1)
      {
        // Wait for animation to finish
        setTimeout(() => onClose?.(), 250);
      }
      else
      {
        onSnap?.(snapIndex);
      }
    }
  };

  const themes = useThemes(theme, shade);
  const [ panResponder, panY, setSnapIndex ] = useVerticalPanSnapper(finalSnapOffsets, finalSnapOffsets.length - 1, onSnapFinal, -handleHeight / 2);

  useEffect(() =>
  {
    if (initialized || initialSnapIndex === undefined)
    {
      return;
    }

    setSnapIndex(initialSnapIndex);
    setInitialized(true);
  }, [ initialized, initialSnapIndex, setSnapIndex ]);

  const style: ViewStyle =
  {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    transform: [ { translateY: panY } ]
  };

  const containerStyle: ViewStyle =
  {
    ...styles.flex1,
    borderTopLeftRadius: rounding.medium,
    borderTopRightRadius: rounding.medium
  };

  const handleStyle: ViewStyle =
  {
    width: '33%',
    height: 4,
    borderRadius: 2,
    backgroundColor: themes.current.front
  };

  return (
    <Animated.View style={style}>
      <Container theme={theme} shade={shade} style={containerStyle}>
        <View style={{ ...styles.centerContent, ...styles.padding }} {...panResponder.panHandlers}>
          <View style={handleStyle} />
        </View>
        {children}
      </Container>
    </Animated.View>
  );
};

export default Drawer;
