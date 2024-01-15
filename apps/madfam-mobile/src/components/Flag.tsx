import { FC, useContext } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import CountryFlag from 'react-native-country-flag';

import { styles, ThemeContext } from 'apps-mobile';

interface Props
{
  isoCode?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const Flag: FC<Props> = ({ isoCode, size = 25, style: propStyle }) =>
{
  const themes = useContext(ThemeContext);

  const style: ViewStyle =
  {
    ...styles.roundedSmall,
    width: size * 1.6,
    height: size,
    backgroundColor: themes.current.front
  };

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  return (
    <>
      {!isoCode && <View style={{ ...style, ...viewStyle }} />}
      {isoCode && <CountryFlag isoCode={isoCode} size={size} style={{ ...style, ...viewStyle }} />}
    </>
  );
};

export default Flag;
