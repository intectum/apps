import { FC, useContext } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

import { styles, Text } from 'apps-mobile';
import { User as UserType } from 'madfam-core';

import { CurrentUserContext } from '../common/current-user.tsx';
import UserCircle from './UserCircle.tsx';

interface Props extends ViewProps
{
  user: UserType;
  subtitle?: string;
  small?: boolean;
  currentUserAsMe?: boolean;
}

const UserCard: FC<Props> = ({ user, subtitle, small, currentUserAsMe, style: propStyle, ...viewProps }) =>
{
  const { currentUser } = useContext(CurrentUserContext);

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  return (
    <View {...viewProps} style={{ ...styles.row, ...viewStyle }}>
      <UserCircle
        shade="front"
        user={user}
        size={small ? 'small' : undefined}
        highlight={user.id === currentUser.id}
        style={styles.marginRightSmall}
      />
      <View style={styles.flex1}>
        <Text size={small ? undefined : 'large'} numberOfLines={1}>{currentUserAsMe && user.id === currentUser.id ? 'Me' : user.displayName}</Text>
        {subtitle && <Text shade="medium" size="small">{subtitle}</Text>}
      </View>
    </View>
  );
};

export default UserCard;
