import { FC } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getPaddingAsInsets } from '../styles';

export interface Props extends ViewProps
{
  type?: 'full' | 'top' | 'middle' | 'bottom';
}

const SafeAreaView: FC<Props> = ({ type = 'full', style: propStyle, ...viewProps }) =>
{
  const safeAreaInsets = useSafeAreaInsets();

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  const paddingInsets = getPaddingAsInsets(viewStyle);
  const paddingStyle: ViewStyle =
  {
    paddingLeft: (safeAreaInsets.left ?? 0) + (paddingInsets.left ?? 0),
    paddingRight: (safeAreaInsets.right ?? 0) + (paddingInsets.right ?? 0),
    paddingTop: ([ 'full', 'top' ].includes(type) ? (safeAreaInsets.top ?? 0) : 0) + (paddingInsets.top ?? 0),
    paddingBottom: ([ 'full', 'bottom' ].includes(type) ? (safeAreaInsets.bottom ?? 0) : 0) + (paddingInsets.bottom ?? 0)
  };

  return <View {...viewProps} style={{ ...viewStyle, ...paddingStyle }} />;
};

export default SafeAreaView;
