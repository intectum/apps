import analytics from '@react-native-firebase/analytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, View, ViewStyle } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { DateOnly, today } from 'apps-core';
import {
  Button,
  DateInput,
  Drawer,
  Icon,
  Pressable,
  SafeAreaView,
  spacing,
  styles,
  Text,
  useDimensions
} from 'apps-mobile';
import {
  Address,
  formatAddress,
  getCurrentStop,
  getMatchingStops,
  sameAddress,
  Stop,
  toAddressKey,
  User
} from 'vaga-core';

import { CurrentUserContext } from '../common/current-user';
import { useAnimateToLocation } from '../common/maps';
import { RootStackParamList } from '../common/types';
import Flag from '../components/Flag';
import Map from '../components/Map';
import Screen from '../components/Screen';
import StopModal from '../components/Stop';
import UserCard from '../components/UserCard.tsx';
import UserCircle from '../components/UserCircle.tsx';

const Home: FC<NativeStackScreenProps<RootStackParamList, 'Home'>> = ({ navigation }) =>
{
  const { currentUser, currentUserAndFriends } = useContext(CurrentUserContext);
  const mapRef = useRef<MapView>(null);
  const [ address, setAddress ] = useState<Address>();
  const [ editStop, setEditStop ] = useState<Stop>();
  const [ dateRange, setDateRange ] = useState<DateOnly[]>([ today(), today() ]);
  const [ usersAtAddress, setUsersAtAddress ] = useState<User[]>();

  const { safeAreaInsets, windowDimensions } = useDimensions();

  const currentStop = getCurrentStop(currentUser.timeline);
  useAnimateToLocation(mapRef, currentStop?.address.location);

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'Home' });
  }, []);

  const matchingAddressUsers = useMemo(() =>
  {
    const results: { address: Address, users: User[] }[] = [];

    for (const user of currentUserAndFriends)
    {
      const matchingStops = getMatchingStops(user.timeline, dateRange);
      for (const matchingStop of matchingStops)
      {
        let result = results.find(theResult => sameAddress(theResult.address, matchingStop.address));
        if (!result)
        {
          result = { address: matchingStop.address, users: [] };
          results.push(result);
        }

        result.users.push(user);
      }
    }

    return results;
  }, [ dateRange, currentUserAndFriends ]);

  const headerStyle: ViewStyle =
  {
    ...styles.row,
    ...styles.overlayTopLeft,
    ...styles.overlayTopRight
  };

  const dateInputStyle: ViewStyle =
  {
    ...styles.flex1,
    ...styles.marginRight,
    marginTop: 4
  };

  const actionsStyle: ViewStyle =
  {
    ...styles.overlayBottomRight,
    alignItems: 'flex-end'
  };

  const drawerHeaderStyle: ViewStyle =
  {
    ...styles.row,
    ...styles.marginShort
  };

  const drawerFlagStyle: ViewStyle =
  {
    ...styles.marginRightSmall,
    marginLeft: 4
  };

  return (
    <Screen forwardInitialNotification>
      <Map
        ref={mapRef}
        style={styles.flex1}
        initialCamera={currentStop?.address.location &&
        {
          center: currentStop.address.location,
          heading: 0,
          pitch: 0,
          zoom: 1
        }}
      >
        {matchingAddressUsers?.map(addressUsers =>
        {
          if (!addressUsers.address.location)
          {
            return;
          }

          const currentUserAtAddress = !!addressUsers.users.find(user => user.id === currentUser.id);

          return (
            <Marker
              key={toAddressKey(addressUsers.address)}
              coordinate={addressUsers.address.location}
              onPress={async () =>
              {
                setAddress(addressUsers.address);
                setUsersAtAddress(addressUsers.users);

                await analytics().logEvent(
                  'home_open_address',
                  {
                    address: addressUsers.address
                  }
                );
              }}
            >
              <UserCircle
                shade="front"
                user={addressUsers.users.length === 1 ? addressUsers.users[0] : undefined}
                highlight={currentUserAtAddress}
              >
                <Text>{addressUsers.users.length}</Text>
              </UserCircle>
            </Marker>
          );
        })}
      </Map>
      <SafeAreaView style={headerStyle}>
        <DateInput
          range
          inline
          style={dateInputStyle}
          value={dateRange}
          onChange={async value =>
          {
            setDateRange(value);

            await analytics().logEvent(
              'home_date_range',
              {
                from: value[0],
                to: value[1]
              }
            );
          }}
        />
        <Pressable
          android_ripple={undefined}
          onPress={() => navigation.push('Profile', { userId: currentUser.id })}
        >
          <UserCircle shade="front" user={currentUser} />
        </Pressable>
      </SafeAreaView>
      <SafeAreaView style={actionsStyle}>
        <Button circle style={styles.marginBottom} onPress={() => navigation.push('HeatMap')}>
          <Icon icon="globe" />
        </Button>
        <Button circle style={styles.marginBottom} onPress={() => navigation.push('Friends')}>
          <Icon icon="user-group" />
        </Button>
        <Button shade="bright" circle="large" onPress={() => setEditStop({ address: { country: '' }, arrivedAt: today(), confidence: 1 })}>
          <Icon icon="plus" />
        </Button>
      </SafeAreaView>
      {address && usersAtAddress &&
        <Drawer
          snapOffsets={[
            safeAreaInsets.top + spacing.medium * 2 + 48,
            windowDimensions.height * 0.5,
            windowDimensions.height - safeAreaInsets.bottom - (spacing.medium * 2 + 4 + spacing.small * 2 + 25 + spacing.small * 2 + 48 + (usersAtAddress.length > 1 ? spacing.small + 24 : 0))
          ]}
          initialSnapIndex={2}
          onClose={() =>
          {
            setAddress(undefined);
            setUsersAtAddress(undefined);
          }}
        >
          <View style={drawerHeaderStyle}>
            <Flag isoCode={address.country} style={drawerFlagStyle} />
            <Text size="large" numberOfLines={1} style={styles.flex1}>{formatAddress(address)}</Text>
          </View>
          <FlatList
            data={usersAtAddress}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <Pressable style={styles.paddingShort} onPress={() => navigation.push('Profile', { userId: item.id })}>
                <UserCard user={item} currentUserAsMe />
              </Pressable>
            }
          />
        </Drawer>
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
                source: 'home-button'
              }
            )
          }
        />
      }
    </Screen>
  );
};

export default Home;
