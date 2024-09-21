import analytics from '@react-native-firebase/analytics';
import { Filter } from '@react-native-firebase/firestore';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Contact, getAll as getAllContacts } from 'react-native-contacts';

import { Button, Icon, setDocument, styles, Text, useDocuments } from 'apps-mobile';
import { Invitation, User } from 'vaga-core';

import { CurrentUserContext } from '../../common/current-user';
import { findUsersByPhoneNumber } from '../../common/firebase/functions';
import UserCard from '../UserCard';

interface Props
{
  onUpdate?: (count: number) => void;
}

const NonFriendsInContacts: FC<Props> = ({ onUpdate }) =>
{
  const { currentUser, friends } = useContext(CurrentUserContext);
  const [ contacts, setContacts ] = useState<Contact[]>();
  const [ users, setUsers ] = useState<User[]>();

  const invitationsReceivedFilter = useMemo(() => Filter('recipientId', '==', currentUser.id), [ currentUser.id ]);
  const invitationsReceived = useDocuments<Invitation>('invitations', invitationsReceivedFilter);

  const invitationsSentFilter = useMemo(() => Filter('senderId', '==', currentUser.id), [ currentUser.id ]);
  const invitationsSent = useDocuments<Invitation>('invitations', invitationsSentFilter);

  const nonFriends = useMemo(() =>
  {
    if (!users)
    {
      return undefined;
    }

    const friendIds = friends.map(friend => friend.id);
    return users.filter(user => !friendIds.includes(user.id) && user.id !== currentUser.id);
  }, [ currentUser.id, friends, users ]);

  useEffect(() =>
  {
    getAllContacts().then(setContacts);
  }, []);

  useEffect(() =>
  {
    if (!contacts || !invitationsReceived)
    {
      return;
    }

    const phoneNumbers = contacts.reduce<string[]>((previousValue, currentValue) =>
      [ ...previousValue, ...currentValue.phoneNumbers.map(thePhoneNumber => thePhoneNumber.number) ],
    []
    );

    const normalizedPhoneNumbers = phoneNumbers.map(phoneNumber => phoneNumber.replaceAll(/[^+0-9]/g, ''));

    const invitationSenderIds = invitationsReceived.map(invitation => invitation.senderId);

    findUsersByPhoneNumber(normalizedPhoneNumbers).then(theUsers =>
    {
      setUsers(theUsers.filter(user => !invitationSenderIds.includes(user.id)));
    });
  }, [ contacts, invitationsReceived ]);

  useEffect(() =>
  {
    if (nonFriends)
    {
      onUpdate?.(nonFriends.length);
    }
  }, [ nonFriends, onUpdate ]);

  if (!invitationsSent || !nonFriends?.length)
  {
    return null;
  }

  const invite = async (user: User) =>
  {
    await setDocument<Invitation>('invitations', { senderId: currentUser.id, recipientId: user.id });

    await analytics().logEvent(
      'send_invitation',
      {
        senderId: currentUser.id,
        recipientId: user.id
      }
    );
  };

  const invited = (user: User) =>
    invitationsSent.some(invitation => user.id === invitation.recipientId);

  return (
    <>
      <Text size="large" style={styles.marginBottom}>Friends already using Vagabond</Text>
      <FlatList
        data={nonFriends}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={{ ...styles.row, ...styles.marginBottom }}>
            <UserCard user={item} style={styles.flex1} />
            <Button
              shade="accent"
              circle
              onPress={() => invite(item)}
              disabled={invited(item)}
            >
              <Icon icon={invited(item) ? 'check' : 'plus'} />
            </Button>
          </View>
        }
      />
    </>
  );
};

export default NonFriendsInContacts;
