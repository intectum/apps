import { FC, ReactNode } from 'react';
import { StyleProp, TextInput as ReactNativeTextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import { fontSizes, lineHeights, styles } from '../styles';
import { useThemes } from '../themes';
import { Size, Themeable } from '../types';

export interface Props extends Themeable, TextInputProps
{
  prefix?: ReactNode;
  size?: Size;
  style?: StyleProp<ViewStyle>;
}

const TextInput: FC<Props> = ({ theme, shade, prefix, size, style: propStyle, ...textInputProps }) =>
{
  const themes = useThemes(theme);

  const style: ViewStyle =
  {
    ...styles.row,
    ...styles.rounded,
    ...styles.paddingShort,
    backgroundColor: `${themes.monochrome.back}88`
  };

  const textInputStyle: TextStyle =
  {
    ...styles.flex1,
    padding: 0,
    fontSize: fontSizes[size ?? 'medium'],
    lineHeight: lineHeights[size ?? 'medium'],
    color: themes.current[shade ?? 'front']
  };

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  return (
    <View style={{ ...style, ...viewStyle }}>
      {prefix &&
        <View style={styles.marginRightSmall}>
          {prefix}
        </View>
      }
      <ReactNativeTextInput
        placeholderTextColor={themes.current.medium}
        style={textInputStyle}
        {...textInputProps}
      />
    </View>
  );
};

export default TextInput;
