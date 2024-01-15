import { FC } from 'react';
import { Pressable as ReactNativePressable, PressableProps } from 'react-native';

import { useThemes } from '../themes';

export type Props = PressableProps;

const Pressable: FC<Props> = pressableProps =>
{
  const themes = useThemes();

  return <ReactNativePressable android_ripple={{ color: `${themes.current.medium}88` }} {...pressableProps} />;
};

export default Pressable;
