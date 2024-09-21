import analytics from '@react-native-firebase/analytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import { afterDate, beforeDate, today } from 'apps-core';
import {
  ActivityIndicator,
  BackButton,
  Button,
  Circle,
  fontSizes,
  Icon,
  lineHeights,
  Panel,
  SafeAreaView,
  spacing,
  styles,
  Text,
  useDimensions,
  useThemes,
  VerticalSplit
} from 'apps-mobile';
import {
  Address,
  config,
  formatAddress,
  getCurrentStop,
  LatLng,
  reverseGeocode,
  sameAddress,
  Stop,
  toAddressKey,
  toCountryAndLevel1Only,
  toCountryOnly
} from 'vaga-core';

import { CurrentUserContext } from '../common/current-user';
import { useAnimateToLocation } from '../common/maps';
import { RootStackParamList } from '../common/types';
import Map from '../components/Map';
import Screen from '../components/Screen';
import SettingsMenu from '../components/profile/SettingsMenu';
import StopModal from '../components/Stop';
import UserCircle from '../components/UserCircle';
import UserTimeline from '../components/UserTimeline';
import FriendMenu from '../components/profile/FriendMenu';

const Profile: FC<NativeStackScreenProps<RootStackParamList, 'Profile'>> = ({ route }) =>
{
  const { currentUser, currentUserAndFriends } = useContext(CurrentUserContext);
  const addStopOpacity = useRef(new Animated.Value(1));
  const mapRef = useRef<MapView>(null);
  const [ editStop, setEditStop ] = useState<Stop>();
  const [ editStopSource, setEditStopSource ] = useState<string>();
  const [ newStopAddress, setNewStopAddress ] = useState<Address>();
  const [ newStopTimeout, setNewStopTimeout ] = useState<NodeJS.Timeout>();

  const { safeAreaInsets, windowDimensions } = useDimensions();
  const themes = useThemes();

  const user = currentUserAndFriends.find(theUser => theUser.id === route.params.userId);
  const currentStop = getCurrentStop(user?.timeline ?? []);
  const currentStopIndex = currentStop && user?.timeline.indexOf(currentStop);
  const initialScrollIndex = route.params.initialScrollIndex !== undefined && route.params.initialScrollIndex >= 0 ? route.params.initialScrollIndex : currentStopIndex;

  const addressesByKey = useMemo(() =>
  {
    if (!user)
    {
      return {};
    }

    const addresses: Record<string, Address> = {};
    for (const stop of user.timeline)
    {
      const addressKey = toAddressKey(stop.address);
      addresses[addressKey] = stop.address;
    }

    return addresses;
  }, [ user ]);

  useAnimateToLocation(mapRef, currentStop?.address.location);

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'Profile' });
  }, []);

  if (!user)
  {
    return (
      <Screen forwardInitialNotification>
        <Panel style={{ ...styles.centerContent, ...styles.flex1 }}>
          <ActivityIndicator />
        </Panel>
      </Screen>
    );
  }

  const updateNewStop = async (location: LatLng) =>
  {
    const addresses = await reverseGeocode(location);
    if (!addresses.length)
    {
      return;
    }

    let address = addresses[0];

    const camera = await mapRef.current?.getCamera();
    if (camera?.zoom)
    {
      if (camera.zoom < 4)
      {
        address = toCountryOnly(address);
      }
      else if (camera.zoom < 8)
      {
        address = toCountryAndLevel1Only(address);
      }

      if (camera.zoom < 8)
      {
        const adjustedAddress = await config.addressCache.get(toAddressKey(address));
        if (adjustedAddress)
        {
          address = adjustedAddress;
        }
      }
    }

    setNewStopAddress(address);

    clearTimeout(newStopTimeout);
    setNewStopTimeout(setTimeout(
      () =>
      {
        Animated.timing(
          addStopOpacity.current,
          {
            toValue: 0,
            useNativeDriver: false
          }
        ).start(() => setNewStopAddress(undefined));
      },
      3000
    ));

    addStopOpacity.current.setValue(1);
  };

  const addStopStyle: ViewStyle =
  {
    opacity: addStopOpacity.current
  };

  const addStopPointerStyle: ViewStyle =
  {
    marginTop: -12,
    marginBottom: -4
  };

  const userCircleStyle: ViewStyle =
  {
    marginTop: -32
  };

  return (
    <Screen>
      <VerticalSplit
        snapOffsets={[
          safeAreaInsets.top + spacing.medium * 3 + 48,
          windowDimensions.height * 0.5,
          windowDimensions.height - safeAreaInsets.bottom - (32 + spacing.small + lineHeights.large + lineHeights.medium + spacing.small)
        ]}
        initialSnapIndex={1}
      >
        <Map
          ref={mapRef}
          style={styles.flex1}
          initialCamera={currentStop?.address.location &&
          {
            center: currentStop?.address.location,
            heading: 0,
            pitch: 0,
            zoom: 1
          }}
          onPress={event => updateNewStop(event.nativeEvent.coordinate)}
        >
          {currentStop &&
            <>
              <Polyline
                coordinates={user.timeline
                  .filter(stop => !afterDate(stop.arrivedAt, currentStop.arrivedAt))
                  .map(stop => stop.address.location)
                  .filter(location => !!location) as LatLng[]
                }
                geodesic
                strokeWidth={2}
                strokeColor={`${themes.stone.front}22`}
              />
              <Polyline
                coordinates={user.timeline
                  .filter(stop => !beforeDate(stop.arrivedAt, currentStop.arrivedAt))
                  .map(stop => stop.address.location)
                  .filter(location => !!location) as LatLng[]
                }
                geodesic
                strokeWidth={2}
                strokeColor={themes.current.accent}
              />
            </>
          }
          {Object.keys(addressesByKey).map(addressKey =>
          {
            const address = addressesByKey[addressKey];
            if (!address.location)
            {
              return null;
            }

            const currentStopAtAddress = !!currentStop && sameAddress(address, currentStop.address);

            return (
              <Marker key={addressKey} coordinate={address.location}>
                <Icon
                  icon="map-pin"
                  style={{ color: currentStopAtAddress ? themes.current.accent : themes.stone.front }}
                />
              </Marker>
            );
          })}
          {newStopAddress?.location &&
            <Marker
              coordinate={newStopAddress.location}
              onPress={() =>
              {
                setEditStop({ address: newStopAddress, arrivedAt: today(), confidence: 1 });
                setEditStopSource('map');
              }}
            >
              <Animated.View style={addStopStyle}>
                <Panel style={{ ...styles.row, ...styles.roundedSmall, ...styles.paddingSmall }}>
                  <Circle shade="accent" size="small" style={styles.marginRightSmall}>
                    <Icon icon="plus" size={fontSizes.small} />
                  </Circle>
                  <Text size="small">{formatAddress(newStopAddress)}</Text>
                </Panel>
                <View style={styles.centerContent}>
                  <Icon shade="accent" icon="caret-down" style={addStopPointerStyle} />
                </View>
              </Animated.View>
            </Marker>
          }
        </Map>
        <Panel safeAreaType="bottom" style={styles.flex1}>
          <View style={styles.centerContent}>
            <UserCircle
              shade="front"
              size="large"
              user={user}
              highlight={user.id === currentUser.id}
              style={userCircleStyle}
            />
            <View style={styles.marginShort}>
              <Text size="large" numberOfLines={1} style={styles.centerText}>{user.displayName}</Text>
              <Text shade="medium" numberOfLines={1} style={styles.centerText}>{formatAddress(currentStop?.address)}</Text>
            </View>
          </View>
          <View style={styles.flex1}>
            <UserTimeline
              user={user}
              initialScrollIndex={initialScrollIndex}
              style={styles.flex1}
            />
          </View>
        </Panel>
      </VerticalSplit>
      <SafeAreaView style={styles.overlayTopLeft}>
        <BackButton />
      </SafeAreaView>
      {user.id !== currentUser.id &&
        <SafeAreaView style={styles.overlayTopRight}>
          <FriendMenu user={user} />
        </SafeAreaView>
      }
      {user.id === currentUser.id &&
        <>
          <SafeAreaView style={styles.overlayTopRight}>
            <SettingsMenu />
          </SafeAreaView>
          <SafeAreaView style={styles.overlayBottomRight}>
            <Button
              shade="accent"
              circle="large"
              onPress={() =>
              {
                setEditStop({ address: { country: '' }, arrivedAt: today(), confidence: 1 });
                setEditStopSource('button');
              }}
            >
              <Icon icon="plus" />
            </Button>
          </SafeAreaView>
        </>
      }
      {editStop &&
        <StopModal
          add
          stop={editStop}
          visible
          onRequestClose={() => setEditStop(undefined)}
          onSave={async () =>
            await analytics().logEvent(
              'add_stop',
              {
                source: `profile-${editStopSource}`
              }
            )
          }
        />
      }
    </Screen>
  );
};

export default Profile;
