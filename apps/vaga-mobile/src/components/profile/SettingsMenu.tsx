import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types';
import { FC, useContext, useState } from 'react';
import { Image, ImageStyle, View } from 'react-native';

import { Button, Circle, fontSizes, Modal, styles, Text, TextInput } from 'apps-mobile';

import { CurrentUserContext } from '../../common/current-user';
import { authorizeWithGoogle, deleteAccount, updateGoogleCalendarChannel } from '../../common/firebase/functions';
import native from '../../common/native';
import { RootStackParamList } from '../../common/types';
import Menu from '../Menu';

const SettingsMenu: FC = () =>
{
  const { currentUserPrivate } = useContext(CurrentUserContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [ closeAccountText, setCloseAccountText ] = useState('');
  const [ showCloseAccount, setShowCloseAccount ] = useState(false);
  const [ showSignOut, setShowSignOut ] = useState(false);
  const [ syncing, setSyncing ] = useState(false);

  const googleCalendarStyle: ImageStyle =
  {
    width: fontSizes.small,
    height: fontSizes.small
  };

  return (
    <>
      <Menu icon="gear">
        <Button
          square
          disabled={syncing}
          onPress={async () =>
          {
            if (currentUserPrivate.google?.refreshToken)
            {
              setSyncing(true);
              await updateGoogleCalendarChannel();
            }
            else
            {
              await authorizeWithGoogle();
            }
          }}
        >
          <Circle
            theme="monochrome"
            shade="light"
            size="small"
            style={styles.marginRightSmall}
          >
            <Image source={require('../../images/google-calendar.png')} style={googleCalendarStyle} />
          </Circle>
          <Text>
            {currentUserPrivate.google?.refreshToken ? 'Force sync' : 'Connect'}
          </Text>
        </Button>
        <Button
          square
          style={styles.marginBottom}
          onPress={() => setShowSignOut(true)}
        >
          <Text>Sign out</Text>
        </Button>
        <Button
          theme="fire"
          square
          onPress={() => setShowCloseAccount(true)}
        >
          <Text>Close account</Text>
        </Button>
      </Menu>
      <Modal
        transparent
        visible={showSignOut}
        onRequestClose={() => setShowSignOut(false)}
      >
        <Text style={styles.marginBottom}>
          Are you sure you want to sign out?
        </Text>
        <View style={styles.rowEnd}>
          <Button
            style={styles.marginRight}
            onPress={() => setShowSignOut(false)}
          >
            <Text>No</Text>
          </Button>
          <Button
            shade="accent"
            onPress={async () =>
            {
              await native.signOut();
              navigation.popToTop();
              navigation.replace('Intro');
            }}
          >
            <Text>Yes</Text>
          </Button>
        </View>
      </Modal>
      <Modal
        theme="fire"
        transparent
        visible={showCloseAccount}
        onRequestClose={() => setShowCloseAccount(false)}
      >
        <Text style={styles.marginBottom}>
          Are you sure you want to close your account?
        </Text>
        <Text style={{ ...styles.marginBottom, ...styles.bold }}>
          All of your data will be deleted
        </Text>
        <Text shade="medium" size="small" style={styles.marginBottomSmall}>Type 'delete me' to confirm</Text>
        <TextInput
          style={styles.marginBottom}
          value={closeAccountText}
          onChangeText={setCloseAccountText}
        />
        <View style={styles.rowEnd}>
          <Button
            style={styles.marginRight}
            onPress={() => setShowCloseAccount(false)}
          >
            <Text>No</Text>
          </Button>
          <Button
            shade="accent"
            disabled={closeAccountText.toLowerCase() !== 'delete me'}
            onPress={async () =>
            {
              await deleteAccount();
              await native.signOut();
              navigation.popToTop();
              navigation.replace('Intro');
            }}
          >
            <Text>Yes</Text>
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default SettingsMenu;
