import { DateTime, WeekdayNumbers } from 'luxon';
import { FC, useCallback, useMemo, useState } from 'react';
import { FlatList, View, ViewStyle, ViewToken } from 'react-native';

import { addMonths, DateOnly, diffMonths, firstOfMonth, toDateTime, today, toIsoString } from 'apps-core';

import { lineHeights, spacing, styles } from '../styles';
import { useThemes } from '../themes';
import { getFlatListItemLayout } from '../virtualized-lists';
import ActivityIndicator from './ActivityIndicator';
import { daySize } from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import Circle from './Circle';
import Text from './Text';

export interface Props
{
  selected?: DateOnly[];
  selectedAsRanges?: boolean;
  onDayPress?: (date: DateOnly) => void;
  style?: ViewStyle;
}

interface Month
{
  offsetDays: number;
  days: DateOnly[];
}

const monthRange = [ 12 * 100, 12 * 2 ];

const Calendar: FC<Props> = ({ selected, selectedAsRanges, onDayPress, style: propStyle }) =>
{
  const createMonth = (firstDay: DateOnly): Month =>
  {
    const firstDayDateTime = toDateTime(firstDay);

    return {
      offsetDays: firstDayDateTime.weekday % 7,
      days: Array.from({ length: firstDayDateTime.daysInMonth ?? 0 }).map((_, index) => ({ ...firstDay, day: index + 1 }))
    };
  };

  const months = useMemo(() =>
  {
    const firstOfThisMonth = firstOfMonth(today());

    return [
      ...Array.from({ length: monthRange[0] }).map((_, index) => createMonth(addMonths(firstOfThisMonth, index - monthRange[0]))),
      createMonth(firstOfThisMonth),
      ...Array.from({ length: monthRange[1] }).map((_, index) => createMonth(addMonths(firstOfThisMonth, index + 1)))
    ];
  }, []);

  const initialMonthIndex = useMemo(() => selected?.length ? monthRange[0] + diffMonths(firstOfMonth(selected[0]), firstOfMonth(today())) : monthRange[0], [ selected ]);
  const [ viewableItemIndices, setViewableItemIndices ] = useState([ initialMonthIndex ]);
  const updateViewableItemIndices = useCallback(
    (info: { viewableItems: Array<ViewToken>; }) =>
      setViewableItemIndices(info.viewableItems
        .map(viewableItem => viewableItem.index)
        .filter(index => index !== null) as number[]),
    []
  );

  const themes = useThemes();

  const getMonthLength = (month: Month) => spacing.medium * 2 + lineHeights.medium + daySize * Math.ceil((month.offsetDays + month.days.length) / 7);

  const daysOfWeekStyle: ViewStyle =
  {
    ...styles.row,
    borderBottomWidth: 1,
    borderBottomColor: themes.current.front
  };

  const listStyle: ViewStyle =
  {
    height: getMonthLength(months[monthRange[0]])
  };

  return (
    <View style={propStyle}>
      <Text size="large" style={styles.centerText}>
        {viewableItemIndices.length ? months[viewableItemIndices[0]].days[0].year : '...'}
      </Text>
      <View style={daysOfWeekStyle}>
        {Array.from({ length: 7 }).map((_, index) =>
          <Circle key={index}>
            <Text size="small" shade="middle">
              {DateTime.utc().set({ weekday: index as WeekdayNumbers }).toLocaleString({ weekday: 'short' })}
            </Text>
          </Circle>
        )}
      </View>
      <View style={listStyle}>
        <FlatList
          data={months}
          keyExtractor={item => toIsoString(item.days[0])}
          getItemLayout={getFlatListItemLayout(getMonthLength)}
          initialScrollIndex={initialMonthIndex}
          renderItem={({ item, index }) =>
            <>
              {!viewableItemIndices.includes(index) &&
                <View style={{ ...styles.centerContent, ...styles.flex1, height: getMonthLength(item) }}>
                  <ActivityIndicator />
                </View>
              }
              {viewableItemIndices.includes(index) &&
                <CalendarMonth
                  offsetDays={item.offsetDays}
                  days={item.days}
                  selected={selected}
                  selectedAsRanges={selectedAsRanges}
                  onDayPress={onDayPress}
                />
              }
            </>
          }
          onViewableItemsChanged={updateViewableItemIndices}
        />
      </View>
    </View>
  );
};

export default Calendar;
