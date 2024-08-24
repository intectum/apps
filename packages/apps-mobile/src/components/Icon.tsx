import { FontAwesomeIcon, FontAwesomeIconStyle, Props as FontAwesomeIconProps } from '@fortawesome/react-native-fontawesome';
import { FC } from 'react';
import { ViewStyle } from 'react-native';

import { Themeable } from 'apps-core';

import { useThemes } from '../themes';

export type Props = Themeable & FontAwesomeIconProps;

const Icon: FC<Props> = ({ theme, shade, style: propStyle, ...fontAwesomeIconProps }) =>
{
  const themes = useThemes(theme);

  const style: FontAwesomeIconStyle =
  {
    color: themes.current[shade ?? 'front']
  };

  const iconStyle = (propStyle ?? {}) as ViewStyle & {
    color?: string;
  };

  return <FontAwesomeIcon size={24} {...fontAwesomeIconProps} style={{ ...style, ...iconStyle }} />;
};

export default Icon;
