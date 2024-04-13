import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types';
import { FC, useState } from 'react';
import { View } from 'react-native';

import { Button, Modal, styles, Text } from 'apps-mobile';
import { User } from 'vaga-core';

import { unfriend } from '../../common/firebase/functions';
import { RootStackParamList } from '../../common/types';
import Menu from '../Menu';

interface Props
{
  user: User;
}

const FriendMenu: FC<Props> = ({ user }) =>
{
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [ showUnfriend, setShowUnfriend ] = useState(false);

  return (
    <>
      <Menu>
        <Button
          theme="fire"
          square
          onPress={() => setShowUnfriend(true)}
        >
          <Text>Unfriend</Text>
        </Button>
      </Menu>
      <Modal
        theme="fire"
        transparent
        visible={showUnfriend}
        onRequestClose={() => setShowUnfriend(false)}
      >
        <Text style={styles.marginBottom}>
          Are you sure you want to unfriend {user.displayName}?
        </Text>
        <View style={styles.rowEnd}>
          <Button
            style={styles.marginRight}
            onPress={() => setShowUnfriend(false)}
          >
            <Text>No</Text>
          </Button>
          <Button
            shade="bright"
            onPress={async () =>
            {
              await unfriend(user.id);
              navigation.goBack();
            }}
          >
            <Text>Yes</Text>
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default FriendMenu;
