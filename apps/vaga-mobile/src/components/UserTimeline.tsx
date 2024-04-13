import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types';
import { FC, useContext, useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { toDateTime } from 'apps-core';
import {
  Button,
  Icon,
  lineHeights,
  SectionListFlatItem,
  spacing,
  styles,
  Text,
  toSections,
  updateDocument
} from 'apps-mobile';
import {
  formatAddress,
  getCurrentStop,
  getUsersWithMatchingStops,
  Stop,
  User
} from 'vaga-core';

import { CurrentUserContext } from '../common/current-user.tsx';
import { RootStackParamList } from '../common/types.ts';
import Flag from './Flag.tsx';
import Timeline from './Timeline.tsx';
import StopModal from './Stop.tsx';
import StopConfidence from './StopConfidence.tsx';
import StopConfidenceInput from './StopConfidenceInput.tsx';
import UserCircleList from './UserCircleList.tsx';

interface Props
{
  user: User;
  initialScrollIndex?: number;
  style?: StyleProp<ViewStyle>;
}

const UserTimeline: FC<Props> = ({ user, initialScrollIndex, style }) =>
{
  const { currentUser, currentUserAndFriends } = useContext(CurrentUserContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [ editIndex, setEditIndex ] = useState<number>();

  const currentStop = useMemo(() => getCurrentStop(user.timeline ?? []), [ user ]);
  const sections = useMemo(() => toSections(user.timeline, stop => `${stop.arrivedAt.year}`), [ user ]);
  const usersWithMatchingStops = useMemo(
    () => user.timeline.reduce<User[][]>((previousValue, _, currentIndex) =>
      [ ...previousValue, getUsersWithMatchingStops(currentUserAndFriends, user, currentIndex) ]
    , []),
    [ currentUserAndFriends, user ]
  );

  const stopHeaderHeight = spacing.medium * 2 + 24;
  const lastStopMarginBottom = spacing.medium + 64;
  const currentStopIndex = currentStop && user.timeline.indexOf(currentStop);

  const showReview = (stop: Stop) => stop.confidence === undefined && user.id === currentUser.id;

  const getItemLength = (item: SectionListFlatItem<Stop>) =>
  {
    if (!item.item)
    {
      return 0;
    }

    const reviewHeight = showReview(item.item) ? lineHeights.small + spacing.small + 48 + spacing.small : 0;
    const userCircleListHeight = usersWithMatchingStops[item.meta.itemIndex].length ? 24 + spacing.small : 0;
    const lastStopMarginBottomHeight = item.meta.itemIndex === user.timeline.length - 1 ? lastStopMarginBottom : 0;

    return stopHeaderHeight + reviewHeight + userCircleListHeight + lastStopMarginBottomHeight;
  };

  const removeStop = (index: number) =>
    updateDocument<User>('users', user.id, { timeline: user.timeline.filter((_, theIndex) => theIndex !== index) });

  const stopStyle: ViewStyle =
  {
    ...styles.flex1
  };

  const lastStopStyle: ViewStyle =
  {
    ...stopStyle,
    marginBottom: lastStopMarginBottom
  };

  const stopHeaderStyle: ViewStyle =
  {
    ...styles.row,
    height: stopHeaderHeight
  };

  const stopAddressStyle: ViewStyle =
  {
    height: lineHeights.medium
  };

  return (
    <>
      <Timeline
        style={style}
        sections={sections}
        extraData={currentStopIndex}
        highlightIndex={currentStopIndex}
        initialScrollItemIndex={initialScrollIndex}
        itemLength={getItemLength}
        renderItem={({ item }) =>
          <View style={user.id === currentUser.id && item.itemIndex === item.itemCount - 1 ? lastStopStyle : stopStyle}>
            <View style={stopHeaderStyle}>
              <Flag isoCode={item.address.country} style={styles.marginRightSmall} />
              <View style={{ ...styles.flex1, ...styles.marginRightSmall }}>
                <Text numberOfLines={1} style={stopAddressStyle}>{formatAddress(item.address)}</Text>
                <Text shade="medium" size="small">
                  {toDateTime(item.arrivedAt).toLocaleString({ day: 'numeric', month: 'long' })}
                </Text>
              </View>
              {!showReview(item) && item.confidence !== 1 && <StopConfidence user={user} stopIndex={item.itemIndex} />}
            </View>
            {showReview(item) &&
              <View style={styles.marginBottomSmall}>
                <StopConfidenceInput user={user} stopIndex={item.itemIndex} source="user-timeline">
                  <Button circle style={styles.marginRight} onPress={() => setEditIndex(item.itemIndex)}>
                    <Icon icon="pencil" />
                  </Button>
                  <Button circle onPress={() => removeStop(item.itemIndex)}>
                    <Icon icon="x" />
                  </Button>
                </StopConfidenceInput>
              </View>
            }
            {!!usersWithMatchingStops[item.itemIndex].length &&
              <UserCircleList users={usersWithMatchingStops[item.itemIndex]} style={styles.marginBottomSmall} />
            }
          </View>
        }
        onItemPress={item => navigation.push('Stop', { userId: user.id, index: item.itemIndex })}
      />
      {editIndex !== undefined &&
        <StopModal
          stop={user.timeline[editIndex]}
          visible
          onRequestClose={() => setEditIndex(undefined)}
        />
      }
    </>
  );
};

export default UserTimeline;
