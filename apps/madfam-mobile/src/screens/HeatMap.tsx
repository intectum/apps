import analytics from '@react-native-firebase/analytics';
import { Filter } from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Heatmap } from 'react-native-maps';

import { addMonths, firstOfMonth, toDateTime, today, WithoutId } from 'apps-core';
import {
  BackButton,
  Circle,
  Container,
  fontSizes,
  getDocuments,
  Icon,
  SafeAreaView,
  spacing,
  styles,
  Switch,
  Text,
  toSections,
  useDimensions,
  useThemes,
  VerticalSplit
} from 'apps-mobile';
import { createMonthlyHeatMap, getCurrentStop, HeatMap as HeatMapType } from 'madfam-core';

import { CurrentUserContext } from '../common/current-user';
import { RootStackParamList } from '../common/types';
import Map from '../components/Map';
import Screen from '../components/Screen';
import Timeline, { timelineSectionHeaderLength } from '../components/Timeline';

const monthCount = 12;

const HeatMap: FC<NativeStackScreenProps<RootStackParamList, 'HeatMap'>> = () =>
{
  const { currentUser, currentUserAndFriends } = useContext(CurrentUserContext);
  const [ friendsOnly, setFriendsOnly ] = useState(false);
  const [ index, setIndex ] = useState(0);
  const [ heatMap, setHeatMap ] = useState<WithoutId<HeatMapType>>();

  const { safeAreaInsets, windowDimensions } = useDimensions();
  const themes = useThemes();

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'HeatMap' });
  }, []);

  const months = useMemo(
    () =>
    {
      const firstOfThisMonth = firstOfMonth(today());

      return Array.from({ length: monthCount }).map((_, theIndex) =>
        ({ address: { country: '' }, arrivedAt: addMonths(firstOfThisMonth, theIndex) }));
    },
    []
  );

  const sections = useMemo(() => toSections(months, stop => `${stop.arrivedAt.year}`), [ months ]);

  useEffect(() =>
  {
    if (friendsOnly)
    {
      createMonthlyHeatMap(currentUserAndFriends, months[index].arrivedAt.year, months[index].arrivedAt.month).then(setHeatMap);
    }
    else
    {
      const filter = Filter('date.month', '==', months[index].arrivedAt.month);
      getDocuments<HeatMapType>('heatMaps', filter).then(heatMaps => setHeatMap(heatMaps[0]));
    }
  }, [ currentUserAndFriends, friendsOnly, index, months ]);

  const currentStop = getCurrentStop(currentUser.timeline);

  return (
    <Screen forwardInitialNotification>
      <VerticalSplit
        snapOffsets={[
          safeAreaInsets.top + spacing.medium * 3 + 48,
          windowDimensions.height * 0.5,
          windowDimensions.height - safeAreaInsets.bottom - (spacing.medium * 2 + 27 + timelineSectionHeaderLength + spacing.medium * 2 + 24)
        ]}
        initialSnapIndex={1}
      >
        <Map
          style={styles.flex1}
          initialCamera={currentStop?.address.location &&
          {
            center: currentStop.address.location,
            heading: 0,
            pitch: 0,
            zoom: 1
          }}
        >
          {heatMap &&
            <Heatmap
              points={heatMap.points}
              radius={50}
              opacity={1}
              gradient={{
                colors: [ 'transparent', themes.current.bright, themes.monochrome.front ],
                startPoints: [ 0, 0.5, 1 ],
                colorMapSize: 256
              }}
            />
          }
        </Map>
        <Container safeAreaType="bottom" style={styles.flex1}>
          <View style={{ ...styles.row, ...styles.margin }}>
            <Switch
              style={styles.marginRightSmall}
              value={friendsOnly}
              onChange={event => setFriendsOnly(event.nativeEvent.value)}
            />
            <Text>Friends only</Text>
          </View>
          <Timeline
            sections={sections}
            extraData={index}
            highlightIndex={0}
            itemLength={spacing.medium * 2 + 48}
            renderItem={({ item }) =>
              <View style={styles.row}>
                <Text style={styles.marginRight}>
                  {toDateTime(item.arrivedAt).toLocaleString({ month: 'long' })}
                </Text>
                {item.itemIndex === index &&
                  <Circle shade="front" size="small">
                    <Icon icon="check" size={fontSizes.medium} />
                  </Circle>
                }
              </View>
            }
            onItemPress={item => setIndex(item.itemIndex)}
          />
        </Container>
      </VerticalSplit>
      <SafeAreaView style={styles.overlayTopLeft}>
        <BackButton />
      </SafeAreaView>
    </Screen>
  );
};

export default HeatMap;
