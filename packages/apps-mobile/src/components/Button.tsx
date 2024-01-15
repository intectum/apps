import { FC, PropsWithChildren } from 'react';
import { PressableProps, ViewStyle } from 'react-native';

import { styles } from '../styles';
import { Size, Themeable } from '../types';
import Container from './Container';
import Circle from './Circle';
import Pressable from './Pressable';

export interface Props extends Themeable, PressableProps
{
  circle?: Size | boolean;
  square?: boolean;
}

const Button: FC<PropsWithChildren<Props>> = ({ theme, shade, circle, square, children, style: propStyle, ...pressableProps }) =>
{
  const circlePressableStyle: ViewStyle =
  {
    ...styles.centerContent,
    width: '100%',
    height: '100%'
  };

  const containerStyle: ViewStyle =
  {
    ...(square ? {} : styles.rounded)
  };

  const containerPressableStyle: ViewStyle =
  {
    ...styles.centerContent,
    ...styles.row,
    ...styles.paddingShort
  };

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  const finalShade = pressableProps.disabled ? 'medium' : shade;

  if (circle)
  {
    return (
      <Circle theme={theme} shade={finalShade} size={typeof circle === 'string' ? circle : undefined} style={viewStyle}>
        <Pressable style={circlePressableStyle} {...pressableProps}>
          {children}
        </Pressable>
      </Circle>
    );
  }

  return (
    <Container theme={theme} shade={finalShade} style={{ ...containerStyle, ...viewStyle }}>
      <Pressable style={containerPressableStyle} {...pressableProps}>
        {children}
      </Pressable>
    </Container>
  );
};

export default Button;
