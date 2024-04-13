import analytics from '@react-native-firebase/analytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  Linking,
  Pressable,
  View,
  ViewStyle
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { formatDateRange } from 'apps-core';
import {
  BackButton,
  Button,
  Circle,
  Container,
  fontSizes,
  Icon,
  SafeAreaView,
  styles,
  Text,
  updateDocument,
  useDimensions
} from 'apps-mobile';
import {
  formatAddress,
  getDateRangeForStop,
  getMatchingStops,
  getUsersWithMatchingStops,
  sameAddress,
  User
} from 'vaga-core';

import { CurrentUserContext } from '../common/current-user';
import { useAnimateToLocation } from '../common/maps';
import { NotificationContext } from '../common/notifications';
import { RootStackParamList } from '../common/types';
import Flag from '../components/Flag';
import Map from '../components/Map';
import Screen from '../components/Screen';
import StopModal from '../components/Stop';
import StopConfidence from '../components/StopConfidence';
import StopConfidenceInput from '../components/StopConfidenceInput';
import UserCard from '../components/UserCard.tsx';

const Stop: FC<NativeStackScreenProps<RootStackParamList, 'Stop'>> = ({ route, navigation }) =>
{
  const { currentUser, currentUserAndFriends } = useContext(CurrentUserContext);
  const { setNotification } = useContext(NotificationContext);
  const mapRef = useRef<MapView>(null);
  const [ showEdit, setShowEdit ] = useState(false);

  const user = currentUserAndFriends.find(theUser => theUser.id === route.params.userId);
  const stop = user?.timeline[route.params.index];

  const users = useMemo(
    () => user && stop && getUsersWithMatchingStops(currentUserAndFriends, user, route.params.index),
    [ currentUserAndFriends, route.params.index, stop, user ]
  );

  const { windowDimensions } = useDimensions();

  useAnimateToLocation(mapRef, stop?.address.location);

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'Stop' });
  }, []);

  if (!user || !stop)
  {
    return (
      <Screen>
        <Container style={{ ...styles.centerContent, ...styles.flex1 }}>
          <Text style={styles.marginBottom}>Oops! Stop not found...</Text>
          <BackButton />
        </Container>
      </Screen>
    );
  }

  const dateRange = getDateRangeForStop(user.timeline, route.params.index);

  const getDateRanges = (otherUser: User) =>
  {
    const otherStops = getMatchingStops(otherUser.timeline, dateRange).filter(otherStop => sameAddress(otherStop.address, stop.address));
    return otherStops
      .map(otherStop => getDateRangeForStop(otherUser.timeline, otherUser.timeline.indexOf(otherStop)))
      .map(otherDateRange => formatDateRange(otherDateRange))
      .join(', ');
  };

  const remove = async () =>
  {
    await updateDocument<User>('users', currentUser.id, { timeline: currentUser.timeline.filter(theStop => theStop !== stop) });
    navigation.goBack();
  };

  const mapStyle: ViewStyle =
  {
    height: windowDimensions.width / 16 * 9
  };

  const googleCalendarStyle: ImageStyle =
  {
    width: 24,
    height: 24
  };

  const linkStyle: ViewStyle =
  {
    position: 'absolute',
    right: -4,
    bottom: -4,
    zIndex: 1
  };

  return (
    <Screen forwardInitialNotification>
      <Map
        style={mapStyle}
        initialCamera={stop.address.location &&
        {
          center: stop.address.location,
          heading: 0,
          pitch: 0,
          zoom: 1
        }}
      >
        {stop.address.location &&
          <Marker coordinate={stop.address.location}>
            <Icon shade="bright" icon="map-pin" />
          </Marker>
        }
      </Map>
      <Container safeAreaType="bottom" style={styles.flex1}>
        <View style={styles.margin}>
          <View style={{ ...styles.row, ...styles.marginBottom }}>
            <Flag isoCode={stop.address.country} style={styles.marginRightSmall} />
            <View style={{ ...styles.flex1, ...styles.marginRightSmall }}>
              <Text size="large" numberOfLines={1}>{formatAddress(stop.address)}</Text>
              <Text shade="medium">{formatDateRange(dateRange)}</Text>
            </View>
            {stop.confidence !== undefined && <StopConfidence user={user} stopIndex={route.params.index} />}
          </View>
          {stop.sources &&
            <View style={{ ...styles.row, ...styles.marginBottom }}>
              {stop.sources.map(source =>
                <View key={source.id} style={styles.marginRight}>
                  {source.type === 'google-calendar' &&
                    <Button theme="monochrome" shade="light" circle onPress={() => source.url && Linking.openURL(source.url)}>
                      <Image source={require('../images/google-calendar.png')} style={googleCalendarStyle} />
                    </Button>
                  }
                  {source.type === 'location' &&
                    <Button
                      shade="front"
                      circle
                      onPress={async () =>
                      {
                        setNotification(
                          {
                            title: 'Linked to location',
                            body: 'This stop was created from your location.'
                          }
                        );
                      }}
                    >
                      <Icon icon="location-dot" />
                    </Button>
                  }
                  <Circle shade="front" size="small" style={linkStyle}>
                    <Icon icon="link" size={fontSizes.medium} />
                  </Circle>
                </View>
              )}
            </View>
          }
          {stop.confidence === undefined && <StopConfidenceInput user={user} stopIndex={route.params.index} source="stop" />}
        </View>
        <FlatList
          style={styles.flex1}
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <Pressable style={styles.padding} onPress={() => navigation.push('Profile', { userId: item.id })}>
              <UserCard user={item} subtitle={getDateRanges(item)} />
            </Pressable>
          }
        />
      </Container>
      <SafeAreaView style={styles.overlayTopLeft}>
        <BackButton />
      </SafeAreaView>
      {user.id === currentUser.id &&
        <SafeAreaView style={{ ...styles.row, ...styles.overlayTopRight }}>
          <Button circle style={styles.marginRight} onPress={() => setShowEdit(true)}>
            <Icon icon="pencil" />
          </Button>
          <Button circle onPress={remove}>
            <Icon icon="x" />
          </Button>
        </SafeAreaView>
      }
      <StopModal
        stop={stop}
        visible={showEdit}
        onRequestClose={() => setShowEdit(false)}
        onSave={index =>
        {
          if (index !== route.params.index)
          {
            navigation.replace('Stop', { userId: user.id, index });
          }
        }}
      />
    </Screen>
  );
};

export default Stop;
