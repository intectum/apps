import { FC, memo } from 'react';
import { View, ViewStyle } from 'react-native';

import { afterDate, beforeDate, betweenDates, DateOnly, sameDate, toDateTime } from 'apps-core';

import { styles } from '..//styles';
import CalendarDay, { daySize } from './CalendarDay';
import Text from './Text';

export interface Props
{
  offsetDays: number;
  days: DateOnly[];
  selected?: DateOnly[];
  selectedAsRanges?: boolean;
  onDayPress?: (date: DateOnly) => void;
}

const propsAreEqual = (prevProps: Readonly<Props>, nextProps: Readonly<Props>) =>
{
  if (!nextProps.selectedAsRanges)
  {
    const prevSelectedWithinMonth = prevProps.selected?.filter(date => betweenDates(date, prevProps.days[0], prevProps.days[prevProps.days.length - 1], true)) ?? [];
    const nextSelectedWithinMonth = nextProps.selected?.filter(date => betweenDates(date, nextProps.days[0], nextProps.days[nextProps.days.length - 1], true)) ?? [];

    const selectedWithinMonthEqual =
      nextSelectedWithinMonth.length === prevSelectedWithinMonth.length &&
      nextSelectedWithinMonth.every((nextSelectedDate, index) => sameDate(nextSelectedDate, prevSelectedWithinMonth[index]));

    return nextProps.offsetDays === prevProps.offsetDays &&
           nextProps.days === prevProps.days &&
           selectedWithinMonthEqual &&
           nextProps.onDayPress === prevProps.onDayPress;
  }

  const selectedEqual = nextProps.selected === prevProps.selected;

  // This will evaluate to false when the selected prop has not changed even if a day within the month is selected
  // This is an optimisation as it will do the same for both and avoid the check to find if they are really within the month
  const prevContainsSelected = !selectedEqual && !!prevProps.selected?.some(date => betweenDates(date, prevProps.days[0], prevProps.days[prevProps.days.length - 1], true));
  const nextContainsSelected = !selectedEqual && !!nextProps.selected?.some(date => betweenDates(date, nextProps.days[0], nextProps.days[nextProps.days.length - 1], true));

  let prevRangeIsInMonth = false;
  if (!selectedEqual && prevProps.selectedAsRanges && prevProps.selected) // Another optimisation as above
  {
    for (let index = 0; index < prevProps.selected.length - 1; index += 2)
    {
      const firstDay = prevProps.days[0];
      const lastDay = prevProps.days[prevProps.days.length - 1];
      if (!afterDate(prevProps.selected[index], lastDay) && !beforeDate(prevProps.selected[index + 1], firstDay))
      {
        prevRangeIsInMonth = true;
        break;
      }
    }
  }

  let nextRangeIsInMonth = false;
  if (!selectedEqual && nextProps.selectedAsRanges && nextProps.selected) // Another optimisation as above
  {
    for (let index = 0; index < nextProps.selected.length - 1; index += 2)
    {
      const firstDay = nextProps.days[0];
      const lastDay = nextProps.days[nextProps.days.length - 1];
      if (!afterDate(nextProps.selected[index], lastDay) && !beforeDate(nextProps.selected[index + 1], firstDay))
      {
        nextRangeIsInMonth = true;
        break;
      }
    }
  }

  return nextProps.offsetDays === prevProps.offsetDays &&
         nextProps.days === prevProps.days &&
         nextContainsSelected === prevContainsSelected &&
         !nextRangeIsInMonth && !prevRangeIsInMonth &&
         nextProps.onDayPress === prevProps.onDayPress;
};

const CalendarMonth: FC<Props> = memo(({ offsetDays, days, selected, selectedAsRanges, onDayPress }) =>
{
  const daysStyle: ViewStyle =
  {
    ...styles.row,
    flexWrap: 'wrap',
    width: daySize * 7
  };

  return (
    <>
      <Text style={styles.margin}>{toDateTime(days[0]).toLocaleString({ month: 'long', year: 'numeric' })}</Text>
      <View style={daysStyle}>
        <View style={{ width: offsetDays * daySize }} />
        {days.map(date =>
          <CalendarDay
            key={date.day}
            date={date}
            selected={selected}
            selectedAsRanges={selectedAsRanges}
            onPress={onDayPress}
          />
        )}
      </View>
    </>
  );
}, propsAreEqual);

export default CalendarMonth;
