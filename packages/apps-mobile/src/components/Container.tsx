import { FC } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

import { ThemeContext, useThemes } from '../themes';
import { Themeable } from '../types';
import SafeAreaView from './SafeAreaView';

export interface Props extends Themeable, ViewProps
{
  safeAreaType?: 'full' | 'top' | 'middle' | 'bottom';
}

const Container: FC<Props> = ({ theme, shade, safeAreaType, style: propStyle, ...viewProps }) =>
{
  const themes = useThemes(theme, shade);

  const style: ViewStyle =
  {
    backgroundColor: themes.current.back
  };

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  return (
    <ThemeContext.Provider value={themes}>
      {!safeAreaType && <View {...viewProps} style={{ ...style, ...viewStyle }} />}
      {safeAreaType && <SafeAreaView type={safeAreaType} {...viewProps} style={{ ...style, ...viewStyle }} />}
    </ThemeContext.Provider>
  );
};

export default Container;
