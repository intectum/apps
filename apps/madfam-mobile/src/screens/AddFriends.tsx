import analytics from '@react-native-firebase/analytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

import {
  ActivityIndicator,
  Button,
  Container,
  Icon,
  styles,
  Text,
  usePersistentState,
  useThemes
} from 'apps-mobile';

import { CurrentUserContext } from '../common/current-user';
import { RootStackParamList } from '../common/types';
import AddPhoneNumber from '../components/add-friends/AddPhoneNumber';
import FriendRequests from '../components/add-friends/FriendRequests';
import InviteFriends from '../components/add-friends/InviteFriends';
import NonFriendsInContacts from '../components/add-friends/NonFriendsInContacts';
import QrCode from '../components/add-friends/QrCode';
import Header from '../components/Header';
import Screen from '../components/Screen';

const AddFriends: FC<NativeStackScreenProps<RootStackParamList, 'AddFriends'>> = ({ route, navigation }) =>
{
  const { currentUser, currentUserPrivate } = useContext(CurrentUserContext);
  const [ contactPermissionGranted, setContactPermissionGranted ] = useState<boolean>();
  const [ friendRequestCount, setFriendRequestCount ] = useState<number>();
  const [ nonFriendsInContactsCount, setNonFriendsInContactsCount ] = useState<number>();
  const [ onboardingStep, setOnboardingStep ] = useState(0);
  const [ showQrCode, setShowQrCode ] = useState(false);

  const [ _, setOnboarded ] = usePersistentState<boolean>('onboarded');
  const themes = useThemes();

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'AddFriends' });
    check(PERMISSIONS.ANDROID.READ_CONTACTS).then(status => setContactPermissionGranted(status === RESULTS.GRANTED));
  }, []);

  useEffect(() =>
  {
    if (onboardingStep === 0)
    {
      if (currentUser.phoneNumber)
      {
        setOnboardingStep(1);
      }
    }
    else if (onboardingStep === 1)
    {
      if (friendRequestCount === 0 && (contactPermissionGranted === false || nonFriendsInContactsCount === 0))
      {
        setOnboardingStep(2);
      }
    }
  }, [ contactPermissionGranted, currentUser.phoneNumber, friendRequestCount, nonFriendsInContactsCount, onboardingStep ]);

  const friendRequestsEmpty = !friendRequestCount;
  const nonFriendsInContactsEmpty = !contactPermissionGranted || !nonFriendsInContactsCount;

  const continueOnboarding = () =>
  {
    if (currentUserPrivate.google?.refreshToken)
    {
      navigation.replace('Home');
      setOnboarded(true);
    }
    else
    {
      navigation.replace('ConnectCalendar');
    }
  };

  const dashedOutlineStyle: ViewStyle =
  {
    ...styles.flex1,
    ...styles.rounded,
    ...styles.padding,
    borderWidth: 2,
    borderColor: themes.current.front,
    borderStyle: 'dashed'
  };

  if (route.params.onboarding)
  {
    return (
      <Screen deepLinkUrlWhitelist={[]}>
        <Container safeAreaType="full" style={{ ...styles.flex1, ...styles.padding }}>
          {onboardingStep === 0 && !currentUser.phoneNumber && <AddPhoneNumber onSkip={() => setOnboardingStep(1)} />}
          {onboardingStep === 1 &&
            <>
              {friendRequestsEmpty && nonFriendsInContactsEmpty &&
                <View style={{ ...styles.centerContent, ...styles.flex1 }}>
                  <Text style={{ ...styles.marginBottom, ...styles.centerText }}>Searching for friends...</Text>
                  <ActivityIndicator style={styles.marginBottom} />
                  <Button onPress={() => setOnboardingStep(2)}>
                    <Text>Skip</Text>
                  </Button>
                </View>
              }
              <FriendRequests onUpdate={setFriendRequestCount} />
              {contactPermissionGranted && <NonFriendsInContacts onUpdate={setNonFriendsInContactsCount} />}
              {(!friendRequestsEmpty || !nonFriendsInContactsEmpty) &&
                <Button shade="bright" onPress={() => setOnboardingStep(2)}>
                  <Text>Continue</Text>
                </Button>
              }
            </>
          }
          {onboardingStep === 2 &&
            <View style={{ ...styles.centerContent, ...styles.flex1 }}>
              <Text size="large" style={{ ...styles.marginBottom, ...styles.centerText }}>Invite your friends</Text>
              <Icon icon="user-group" size={96} style={styles.marginBottom} />
              <View style={styles.marginBottom}>
                <InviteFriends />
              </View>
              <Button onPress={continueOnboarding}>
                <Text>Skip</Text>
              </Button>
            </View>
          }
        </Container>
      </Screen>
    );
  }

  return (
    <Screen forwardInitialNotification>
      <Header action={() => setShowQrCode(true)} actionIcon="qrcode">
        <Text size="large">Add friends</Text>
      </Header>
      <Container safeAreaType="bottom" style={{ ...styles.flex1, ...styles.padding }}>
        <View style={styles.marginBottom}>
          <InviteFriends />
        </View>
        <FriendRequests />
        {!contactPermissionGranted &&
          <View style={dashedOutlineStyle}>
            {!currentUser.phoneNumber && <AddPhoneNumber />}
            {contactPermissionGranted === false &&
              <View style={{ ...styles.centerContent, ...styles.flex1 }}>
                <Text size="large" style={{ ...styles.marginBottom, ...styles.centerText }}>Join your friends</Text>
                <Icon icon="user-group" size={96} style={styles.marginBottom} />
                <Text style={styles.centerText}>You'll need to grant permission to read your contacts before we can find your friends</Text>
              </View>
            }
          </View>
        }
        {contactPermissionGranted && <NonFriendsInContacts />}
      </Container>
      <QrCode
        visible={showQrCode}
        onRequestClose={() => setShowQrCode(false)}
      />
    </Screen>
  );
};

export default AddFriends;
