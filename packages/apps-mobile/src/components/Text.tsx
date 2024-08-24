import { FC } from 'react';
import { Text as ReactNativeText, TextProps, TextStyle } from 'react-native';

import { Size, Themeable } from 'apps-core';

import { fontSizes, lineHeights } from '../styles';
import { useThemes } from '../themes';

export interface Props extends Themeable, TextProps
{
  size?: Size;
}

const Text: FC<Props> = ({ theme, shade, size, style: propStyle, ...textProps }) =>
{
  const themes = useThemes(theme);

  const style: TextStyle =
  {
    fontSize: fontSizes[size ?? 'medium'],
    lineHeight: lineHeights[size ?? 'medium'],
    color: themes.current[shade ?? 'front']
  };

  const textStyle = (propStyle ?? {}) as TextStyle;

  return <ReactNativeText {...textProps} style={{ ...style, ...textStyle }} />;
};

export default Text;
