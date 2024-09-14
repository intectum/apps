import { FC, useEffect, useRef, useState } from 'react';
import { LayoutRectangle, TextStyle, View, ViewStyle } from 'react-native';

import { afterDate, DateOnly, formatDateRange, sameDate, Size, Themeable, today } from 'apps-core';

import { spacing, styles } from '../styles';
import { useThemes } from '../themes';
import Button from './Button';
import Calendar from './Calendar';
import Icon from './Icon';
import Pressable from './Pressable';
import Text from './Text';
import SlideDown from './SlideDown';
import Modal from './Modal';
import Panel from './Panel';

export interface Props extends Themeable
{
  style?: ViewStyle;
  size?: Size;
  range?: boolean;
  inline?: boolean;
  value?: DateOnly[];
  onChange?: (value: DateOnly[]) => void;
}

const DateInput: FC<Props> = ({ theme, shade, size, range, inline, value, onChange, style: propStyle }) =>
{
  const ref = useRef<View>(null);
  const [ layoutInWindow, setLayoutInWindow ] = useState<LayoutRectangle>();
  const [ pressedDay, setPressedDay ] = useState<DateOnly>();
  const [ internalValue, setInternalValue ] = useState<DateOnly[]>(value ?? []);
  const [ showCalendar, setShowCalendar ] = useState(false);

  const themes = useThemes(theme);

  useEffect(() =>
  {
    if (value)
    {
      setInternalValue(value);
    }
    else
    {
      setInternalValue([]);
    }
  }, [ value ]);

  // NOTE: pressedDay exists as an indirection which allows the onDayPress event to always be given the same function.
  // Since the function never changes, it does not cause re-renders.
  useEffect(() =>
  {
    if (!pressedDay)
    {
      return;
    }

    if (range && internalValue.length === 1)
    {
      if (afterDate(pressedDay, internalValue[0]))
      {
        setInternalValue([ internalValue[0], pressedDay ]);
      }
      else
      {
        setInternalValue([ pressedDay, internalValue[0] ]);
      }
    }
    else
    {
      setInternalValue([ pressedDay ]);
    }

    setPressedDay(undefined);
  }, [ internalValue, pressedDay, range ]);

  const isToday = value && value[0] && sameDate(value[0], today()) && (!value[1] || sameDate(value[1], today()));

  const style: ViewStyle =
  {
    ...styles.rounded,
    overflow: 'hidden',
    backgroundColor: `${themes.monochrome.back}88`
  };

  const pressableStyle: TextStyle =
  {
    ...styles.row,
    ...styles.paddingShort
  };

  const calendarContainerStyle: ViewStyle =
  {
    ...styles.padding,
    ...styles.rounded,
    marginTop: spacing.small
  };

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  const calendar =
    <>
      <Calendar
        style={styles.marginBottom}
        selected={internalValue}
        selectedAsRanges={range}
        onDayPress={setPressedDay}
      />
      <View style={styles.row}>
        <Button style={styles.flex1} onPress={() => setInternalValue(range ? [ today(), today() ] : [ today() ])}>
          <Text>Today</Text>
        </Button>
        <Button
          shade="accent"
          style={styles.flex1}
          onPress={() =>
          {
            onChange?.(internalValue);
            setShowCalendar(false);
          }}
        >
          <Text>Done</Text>
        </Button>
      </View>
    </>;

  return (
    <>
      <View
        ref={ref}
        style={{ ...style, ...viewStyle }}
        onLayout={() =>
        {
          ref.current?.measureInWindow((x, y, width, height) =>
            setLayoutInWindow({ x, y, width, height }));
        }}
      >
        <Pressable style={pressableStyle} onPress={() => setShowCalendar(!showCalendar)}>
          <Icon icon="calendar-days" style={styles.marginRightSmall} />
          <Text shade={shade} size={size} numberOfLines={1}>{value && (isToday ? 'Today' : formatDateRange(value))}</Text>
        </Pressable>
      </View>
      {!inline &&
        <Modal
          transparent
          visible={showCalendar}
          onRequestClose={() => setShowCalendar(false)}
        >
          {calendar}
        </Modal>
      }
      {inline &&
        <SlideDown
          anchorLayoutInWindow={layoutInWindow}
          anchorY="bottom"
          visible={showCalendar}
          onRequestClose={() => setShowCalendar(false)}
        >
          <Panel style={calendarContainerStyle}>
            {calendar}
          </Panel>
        </SlideDown>
      }
    </>
  );
};

export default DateInput;
