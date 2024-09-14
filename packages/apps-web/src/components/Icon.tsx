'use client';

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import { Size, Themeable } from 'apps-core';
import { useThemes } from 'apps-web';

export interface Props extends Themeable, Omit<FontAwesomeIconProps, 'size'>
{
  size?: Size;
}

const Icon: FC<Props> = ({ theme, shade, size, style, ...fontAwesomeIconProps }) =>
{
  const themes = useThemes(theme);

  return (
    <FontAwesomeIcon
      style={{
        height: size === 'large' ? 48 : 24,
        color: themes.current[shade ?? 'front'],
        ...style
      }}
      {...fontAwesomeIconProps}
    />
  );
};

export default Icon;
