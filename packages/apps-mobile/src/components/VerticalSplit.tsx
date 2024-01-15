import { FC, ReactElement } from 'react';
import { Animated, View, ViewStyle } from 'react-native';

import { useVerticalPanSnapper } from '../pan-snapper';
import { rounding, spacing, styles } from '../styles';
import { useThemes } from '../themes';
import Icon from './Icon';

export interface Props
{
  snapOffsets: number[];
  initialSnapIndex: number;
  onSnap?: (snapIndex: number) => void;
  children: [ ReactElement, ReactElement ];
}

const VerticalSplit: FC<Props> = ({ snapOffsets, initialSnapIndex, onSnap, children }) =>
{
  const themes = useThemes();

  const [ panResponder, panY ] = useVerticalPanSnapper(snapOffsets, initialSnapIndex, onSnap);

  const topStyle: ViewStyle =
  {
    height: panY
  };

  const handleStyle: ViewStyle =
  {
    ...styles.rowEnd,
    position: 'absolute',
    left: -rounding.medium,
    right: -rounding.medium,
    top: -16,
    zIndex: 1
  };

  const gripStyle: ViewStyle =
  {
    ...styles.rounded,
    backgroundColor: themes.current.back,
    paddingHorizontal: spacing.medium,
    paddingVertical: 4
  };

  return (
    <>
      <Animated.View style={topStyle}>
        {children[0]}
      </Animated.View>
      <View>
        <View style={handleStyle} {...panResponder.panHandlers}>
          <View style={gripStyle}>
            <Icon icon="grip" />
          </View>
        </View>
      </View>
      <View style={styles.flex1}>
        {children[1]}
      </View>
    </>
  );
};

export default VerticalSplit;
