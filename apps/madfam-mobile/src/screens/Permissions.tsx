import analytics from '@react-native-firebase/analytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { checkMultiple, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { Button, Container, Icon, Modal, Pressable, styles, Text, useThemes } from 'apps-mobile';

import { updateLocation } from '../common/location';
import native from '../common/native';
import { RootStackParamList } from '../common/types';
import Screen from '../components/Screen';

const Permissions: FC<NativeStackScreenProps<RootStackParamList, 'Permissions'>> = ({ navigation }) =>
{
  const [ backgroundLocationGranted, setBackgroundLocationGranted ] = useState<boolean>();
  const [ contactsGranted, setContactsGranted ] = useState<boolean>();
  const [ locationGranted, setLocationGranted ] = useState<boolean>();
  const [ notificationsGranted, setNotificationsGranted ] = useState<boolean>();
  const [ showBackgroundLocation, setShowBackgroundLocation ] = useState(false);

  const themes = useThemes();

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'Permissions' });
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      PERMISSIONS.ANDROID.READ_CONTACTS
    ]).then(statuses =>
    {
      setBackgroundLocationGranted(statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] === RESULTS.GRANTED ? true : undefined);
      setContactsGranted(statuses[PERMISSIONS.ANDROID.READ_CONTACTS] === RESULTS.GRANTED ? true : undefined);
      setLocationGranted(statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED ? true : undefined);
      setNotificationsGranted(statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS] === RESULTS.GRANTED ? true : undefined);
    });
  }, []);

  const requestBackgroundLocationPermission = async () =>
  {
    const result = (await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)) === RESULTS.GRANTED;
    setBackgroundLocationGranted(result);

    await analytics().logEvent(
      'permission_request',
      {
        permission: 'background_location',
        granted: result
      }
    );
  };

  const requestContactsPermission = async () =>
  {
    const result = (await request(PERMISSIONS.ANDROID.READ_CONTACTS)) === RESULTS.GRANTED;
    setContactsGranted(result);

    await analytics().logEvent(
      'permission_request',
      {
        permission: 'contacts',
        granted: result
      }
    );
  };

  const requestLocationPermission = async () =>
  {
    const result = (await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)) === RESULTS.GRANTED;
    setLocationGranted(result);

    await analytics().logEvent(
      'permission_request',
      {
        permission: 'location',
        granted: result
      }
    );
  };

  const requestNotificationsPermission = async () =>
  {
    const result = (await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)) === RESULTS.GRANTED;
    setNotificationsGranted(result);

    await analytics().logEvent(
      'permission_request',
      {
        permission: 'notifications',
        granted: result
      }
    );
  };

  const continueOnboarding = async () =>
  {
    navigation.replace('AddFriends', { onboarding: true });
    await updateLocation();
    await native.updateFcmToken();
  };

  const permissionsStyle: ViewStyle =
  {
    width: '100%'
  };

  const getPermissionContainerStyle = (granted: boolean): ViewStyle =>
    ({
      ...styles.row,
      ...styles.rounded,
      ...styles.padding,
      borderWidth: 2,
      borderColor: granted ? 'transparent' : themes.current.front,
      borderStyle: 'dashed'
    });

  return (
    <Screen deepLinkUrlWhitelist={[]}>
      <Container safeAreaType="full" style={{ ...styles.centerContent, ...styles.flex1, ...styles.padding }}>
        <Text size="large" style={{ ...styles.marginBottom, ...styles.centerText }}>Permissions</Text>
        <Text style={{ ...styles.marginBottom, ...styles.centerText }}>Unlock all the features of MadFam</Text>
        <View style={permissionsStyle}>
          <Pressable style={styles.marginBottom} onPress={requestLocationPermission}>
            <Container shade={locationGranted ? 'front' : undefined} style={getPermissionContainerStyle(!!locationGranted)}>
              <Icon icon="location-pin" size={48} style={styles.marginRight} />
              <View style={styles.flex1}>
                <Text size="large" style={styles.marginBottomSmall}>Location</Text>
                <Text>Let your friends know which city you are in</Text>
              </View>
            </Container>
          </Pressable>
          <Pressable style={styles.marginBottom} onPress={() => !backgroundLocationGranted && setShowBackgroundLocation(true)}>
            <Container shade={backgroundLocationGranted ? 'front' : undefined} style={getPermissionContainerStyle(!!backgroundLocationGranted)}>
              <Icon icon="location-dot" size={48} style={styles.marginRight} />
              <View style={styles.flex1}>
                <Text size="large" style={styles.marginBottomSmall}>Background location</Text>
                <Text style={styles.marginBottomSmall}>Automatically update your location</Text>
              </View>
            </Container>
          </Pressable>
          <Pressable style={styles.marginBottom} onPress={requestNotificationsPermission}>
            <Container shade={notificationsGranted ? 'front' : undefined} style={getPermissionContainerStyle(!!notificationsGranted)}>
              <Icon icon="bell" size={48} style={styles.marginRight} />
              <View style={styles.flex1}>
                <Text size="large" style={styles.marginBottomSmall}>Notifications</Text>
                <Text>Get notified when a friend is nearby or they want to sync up with you</Text>
              </View>
            </Container>
          </Pressable>
          <Pressable style={styles.marginBottom} onPress={requestContactsPermission}>
            <Container shade={contactsGranted ? 'front' : undefined} style={getPermissionContainerStyle(!!contactsGranted)}>
              <Icon icon="user-group" size={48} style={styles.marginRight} />
              <View style={styles.flex1}>
                <Text size="large" style={styles.marginBottomSmall}>Contacts</Text>
                <Text>Find friends already using MadFam</Text>
              </View>
            </Container>
          </Pressable>
        </View>
        <Button
          shade="bright"
          disabled={backgroundLocationGranted === undefined || contactsGranted === undefined || locationGranted === undefined || notificationsGranted === undefined}
          style={styles.marginBottom}
          onPress={continueOnboarding}
        >
          <Text>Continue</Text>
        </Button>
        <Button onPress={continueOnboarding}>
          <Text>Skip</Text>
        </Button>
      </Container>
      <Modal
        transparent
        visible={showBackgroundLocation}
        onRequestClose={() => setShowBackgroundLocation(false)}
      >
        <Text style={{ ...styles.marginBottom, ...styles.bold }}>Background location</Text>
        <Text style={styles.marginBottom}>Please select "Allow all the time" in your settings</Text>
        <View style={styles.rowEnd}>
          <Button
            shade="bright"
            onPress={async () =>
            {
              await requestBackgroundLocationPermission();
              setShowBackgroundLocation(false);
            }}
          >
            <Text>Okay</Text>
          </Button>
        </View>
      </Modal>
    </Screen>
  );
};

export default Permissions;
