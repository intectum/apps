'use client';

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import { Size } from 'apps-core';

export interface Props extends Omit<FontAwesomeIconProps, 'size'>
{
  size?: Size;
}

const Icon: FC<Props> = ({ size, style, ...fontAwesomeIconProps }) =>
{
  return (
    <FontAwesomeIcon
      style={{
        height: size === 'large' ? 48 : 24,
        ...style
      }}
      {...fontAwesomeIconProps}
    />
  );
};

export default Icon;
