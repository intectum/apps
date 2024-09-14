import { FC, memo } from 'react';
import { View, ViewStyle } from 'react-native';

import { betweenDates, DateOnly, diffDays, sameDate, toDateTime, today } from 'apps-core';

import { useThemes } from '../themes';
import Button from './Button';
import Text from './Text';

export interface Props
{
  date: DateOnly;
  selected?: DateOnly[];
  selectedAsRanges?: boolean;
  onPress?: (date: DateOnly) => void;
}

export const daySize = 48;

const propsAreEqual = (prevProps: Readonly<Props>, nextProps: Readonly<Props>) =>
{
  const selectedEqual = nextProps.selected === prevProps.selected;

  // This will evaluate to false when the selected prop has not changed even if the day is selected
  // This is an optimisation as it will do the same for both and avoid the check to find if they are really selected
  const prevIsSelected = !selectedEqual && !!prevProps.selected?.some(date => sameDate(date, prevProps.date));
  const nextIsSelected = !selectedEqual && !!nextProps.selected?.some(date => sameDate(date, nextProps.date));

  let prevIsInRange = false;
  if (!selectedEqual && prevProps.selectedAsRanges && prevProps.selected) // Another optimisation as above
  {
    for (let index = 0; index < prevProps.selected.length - 1; index += 2)
    {
      if (betweenDates(prevProps.date, prevProps.selected[index], prevProps.selected[index + 1], true))
      {
        prevIsInRange = true;
        break;
      }
    }
  }

  let nextIsInRange = false;
  if (!selectedEqual && prevProps.selectedAsRanges && nextProps.selected) // Another optimisation as above
  {
    for (let index = 0; index < nextProps.selected.length - 1; index += 2)
    {
      if (betweenDates(nextProps.date, nextProps.selected[index], nextProps.selected[index + 1], true))
      {
        nextIsInRange = true;
        break;
      }
    }
  }

  return sameDate(nextProps.date, prevProps.date) &&
         nextIsSelected === prevIsSelected &&
         nextIsInRange === prevIsInRange &&
         nextProps.onPress === prevProps.onPress;
};

const CalendarDay: FC<Props> = memo(({ date, selected, selectedAsRanges, onPress }) =>
{
  const themes = useThemes();

  const isToday = sameDate(date, today());
  const isSelected = !!selected?.some(selectedDate => sameDate(date, selectedDate));

  const backgroundStyle: ViewStyle =
  {
    position: 'absolute',
    width: daySize,
    height: daySize
  };

  let isRangeMiddle = false;
  if (selected && selectedAsRanges)
  {
    for (let index = 0; index < selected.length - 1; index += 2)
    {
      const rangeStart = selected[index];
      const rangeEnd = selected[index + 1];

      const isRangeStart = sameDate(date, rangeStart);
      isRangeMiddle = betweenDates(date, rangeStart, rangeEnd);
      const isRangeEnd = sameDate(date, rangeEnd);

      if (!isRangeStart && !isRangeMiddle && !isRangeEnd)
      {
        continue;
      }

      backgroundStyle.backgroundColor = themes.current.medium;

      const dateTime = toDateTime(date);

      if (isRangeStart && isRangeEnd)
      {
        backgroundStyle.borderRadius = daySize / 2;
      }
      else if (dateTime.weekday === 7)
      {
        if (Math.abs(diffDays(date, rangeStart)) < 7)
        {
          backgroundStyle.borderTopLeftRadius = daySize / 2;
        }

        if (Math.abs(diffDays(date, rangeEnd)) < 7)
        {
          backgroundStyle.borderBottomLeftRadius = daySize / 2;
        }
      }
      else if (dateTime.weekday === 6)
      {
        if (Math.abs(diffDays(date, rangeStart)) < 7)
        {
          backgroundStyle.borderTopRightRadius = daySize / 2;
        }

        if (Math.abs(diffDays(date, rangeEnd)) < 7)
        {
          backgroundStyle.borderBottomRightRadius = daySize / 2;
        }
      }
      else if (isRangeStart)
      {
        backgroundStyle.borderTopLeftRadius = daySize / 2;
        backgroundStyle.borderBottomLeftRadius = daySize / 2;
      }
      else if (isRangeEnd)
      {
        backgroundStyle.borderTopRightRadius = daySize / 2;
        backgroundStyle.borderBottomRightRadius = daySize / 2;
      }

      if (date.day === 1)
      {
        backgroundStyle.borderTopLeftRadius = daySize / 2;
        backgroundStyle.borderBottomLeftRadius = daySize / 2;
      }

      if (date.day === dateTime.daysInMonth)
      {
        backgroundStyle.borderTopRightRadius = daySize / 2;
        backgroundStyle.borderBottomRightRadius = daySize / 2;
      }

      break;
    }
  }

  return (
    <View>
      <View style={backgroundStyle} />
      <Button shade={isSelected ? 'front' : (isRangeMiddle ? 'medium' : undefined)} circle onPress={() => onPress?.(date)}>
        <Text shade={isToday ? 'accent' : undefined}>
          {date.day}
        </Text>
      </Button>
    </View>
  );
}, propsAreEqual);

export default CalendarDay;
