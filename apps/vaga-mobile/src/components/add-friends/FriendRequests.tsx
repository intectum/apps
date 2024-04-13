import { Filter } from '@react-native-firebase/firestore';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Button, deleteDocument, Icon, styles, Text, useDocuments } from 'apps-mobile';
import { Invitation, User } from 'vaga-core';

import { CurrentUserContext } from '../../common/current-user';
import { acceptInvitation, findUsersByInvitation } from '../../common/firebase/functions';
import UserCard from '../UserCard.tsx';

interface Props
{
  onUpdate?: (count: number) => void;
}

const FriendRequests: FC<Props> = ({ onUpdate }) =>
{
  const { currentUser } = useContext(CurrentUserContext);
  const [ users, setUsers ] = useState<User[]>();

  const invitationFilter = useMemo(() => Filter('recipientId', '==', currentUser.id), [ currentUser.id ]);
  const invitations = useDocuments<Invitation>('invitations', invitationFilter);

  useEffect(() =>
  {
    findUsersByInvitation().then(setUsers);
  }, [ invitations ]);

  useEffect(() =>
  {
    if (users)
    {
      onUpdate?.(users.length);
    }
  }, [ onUpdate, users ]);

  if (!invitations || !users?.length)
  {
    return null;
  }

  const getInvitation = (user: User) =>
    invitations?.find(invitation => invitation.senderId === user.id);

  const accept = async (user: User) =>
  {
    const invitation = getInvitation(user);
    if (invitation)
    {
      await acceptInvitation(invitation.id, 'list');
    }
  };

  const deny = async (user: User) =>
  {
    const invitation = getInvitation(user);
    if (invitation)
    {
      await deleteDocument('invitations', invitation.id);
      setUsers(users.filter(theUser => theUser.id !== user.id));
    }
  };

  return (
    <>
      <Text size="large" style={styles.marginBottom}>Friend requests</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={{ ...styles.row, ...styles.marginBottom }}>
            <UserCard user={item} style={styles.flex1} />
            <Button
              circle
              onPress={() => deny(item)} style={styles.marginRight}
            >
              <Icon icon="x" />
            </Button>
            <Button
              shade="bright"
              circle
              onPress={() => accept(item)}
            >
              <Icon icon="check" />
            </Button>
          </View>
        }
      />
    </>
  );
};

export default FriendRequests;
