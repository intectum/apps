import { FC } from 'react';
import { Image, ImageStyle } from 'react-native';

import { Circle, CircleProps, Icon } from 'apps-mobile';
import { User as UserType } from 'madfam-core';

interface Props extends CircleProps
{
  user?: UserType;
}

const UserCircle: FC<Props> = ({ user, children, ...circleProps }) =>
{
  const sizePixels = circleProps.size === 'large' ? 64 : (circleProps.size === 'small' ? 24 : 48);

  const imageStyle: ImageStyle =
  {
    width: sizePixels,
    height: sizePixels,
    borderRadius: sizePixels / 2
  };

  return (
    <Circle {...circleProps}>
      {!user && children}
      {user &&
        <>
          {!user?.photoUrl && <Icon icon="user" size={circleProps.size === 'small' ? 12 : 24} />}
          {user?.photoUrl && <Image source={{ uri: user.photoUrl }} style={imageStyle} />}
        </>
      }
    </Circle>
  );
};

export default UserCircle;
