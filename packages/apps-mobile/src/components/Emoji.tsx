import { FC } from 'react';
import { TextProps, TextStyle } from 'react-native';
import ReactNativeEmoji from 'react-native-emoji';

export interface Props extends TextProps
{
  name: string;
  size?: number;
}

const Emoji: FC<Props> = ({ name, size, style: propStyle, ...textProps }) =>
{
  const style: TextStyle =
  {
    fontSize: size ?? 24
  };

  const textStyle = (propStyle ?? {}) as TextStyle;

  return <ReactNativeEmoji name={name} {...textProps} style={{ ...style, ...textStyle }} />;
};

export default Emoji;
