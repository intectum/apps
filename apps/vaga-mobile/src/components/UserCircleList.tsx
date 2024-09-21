import { FC, useContext } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

import { fontSizes, Icon, spacing, styles } from 'apps-mobile';
import { User } from 'vaga-core';

import { CurrentUserContext } from '../common/current-user';
import UserCircle from './UserCircle';

interface Props extends ViewProps
{
  users: User[];
}

const UserCircleList: FC<Props> = ({ users, style: propStyle, ...viewProps }) =>
{
  const { currentUser } = useContext(CurrentUserContext);

  const style: ViewStyle =
  {
    ...styles.row
  };

  const followingUserStyle: ViewStyle =
  {
    marginLeft: -12
  };

  const plusStyle: ViewStyle =
  {
    marginLeft: spacing.small
  };

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  return (
    <View style={{ ...style, ...viewStyle }} {...viewProps}>
      {users.map((user, index) =>
      {
        if (index > 10)
        {
          return null;
        }

        if (index === 10)
        {
          return <Icon key="plus" icon="plus" size={fontSizes.medium} style={plusStyle} />;
        }

        return (
          <UserCircle
            key={user.id}
            shade="front"
            user={user}
            size="small"
            highlight={user.id === currentUser.id}
            style={index > 0 ? followingUserStyle : undefined}
          />
        );
      })}
    </View>
  );
};

export default UserCircleList;
