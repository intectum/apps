import { FC } from 'react';
import { Switch as ReactNativeSwitch, SwitchProps } from 'react-native';

import { useThemes } from '../themes';

export type Props = SwitchProps;

const Switch: FC<Props> = switchProps =>
{
  const themes = useThemes();

  return (
    <ReactNativeSwitch
      trackColor={{ false: themes.current.front, true: themes.current.front }}
      thumbColor={switchProps.value ? themes.current.accent : themes.current.medium}
      {...switchProps}
    />
  );
};

export default Switch;
