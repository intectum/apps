import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import { Size, Themeable } from 'apps-core';

import { useThemes } from '../themes';

export interface Props extends Themeable, Omit<FontAwesomeIconProps, 'size'>
{
  size?: Size;
}

const Icon: FC<Props> = ({ theme, shade, size, style, ...fontAwesomeIconProps }) =>
{
  //useThemes(theme);

  /*const style: FontAwesomeIconStyle =
  {
    color: themes.current[shade ?? 'front']
  }; TODO*/

  return <FontAwesomeIcon style={{ ...style, height: size === 'large' ? 48 : 24 }} {...fontAwesomeIconProps} />;
};

export default Icon;
