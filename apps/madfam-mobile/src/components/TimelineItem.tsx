import { FC, memo, PropsWithChildren } from 'react';
import { SectionListRenderItem, SectionListRenderItemInfo, View, ViewStyle } from 'react-native';

import { sameDate } from 'apps-core';
import { Circle, SectionListData, SectionListItem, spacing, styles, useThemes } from 'apps-mobile';
import { sameAddress, Stop } from 'madfam-core';

interface Props
{
  info: SectionListRenderItemInfo<SectionListItem<Stop>, SectionListData<Stop>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraData?: any;
  highlightIndex?: number;
  renderItem?: SectionListRenderItem<SectionListItem<Stop>, SectionListData<Stop>> | undefined;
}

const propsAreEqual = (prevProps: Readonly<PropsWithChildren<Props>>, nextProps: Readonly<PropsWithChildren<Props>>) =>
{
  return itemsAreEqual(nextProps.info.item, prevProps.info.item) &&
         nextProps.extraData === prevProps.extraData &&
         nextProps.highlightIndex === prevProps.highlightIndex;
};

const itemsAreEqual = (a: SectionListItem<Stop>, b: SectionListItem<Stop>) =>
  sameAddress(a.address, b.address) &&
  sameDate(a.arrivedAt, b.arrivedAt) &&
  a.confidence === b.confidence &&
  a.itemCount === b.itemCount &&
  a.itemIndex === b.itemIndex &&
  a.sectionIndex === b.sectionIndex &&
  a.sectionItemIndex === b.sectionItemIndex;

const TimelineItem: FC<Props> = memo(({ info, highlightIndex, renderItem }) =>
{
  const themes = useThemes();

  const style: ViewStyle =
  {
    ...styles.row,
    alignItems: 'stretch'
  };

  const dotLineStyle: ViewStyle =
  {
    marginHorizontal: spacing.medium
  };

  const lineStyle: ViewStyle =
  {
    position: 'absolute',
    left: 8,
    zIndex: -1,
    width: 8,
    backgroundColor: themes.current.front
  };

  const lineTopStyle: ViewStyle =
  {
    ...lineStyle,
    top: -1, // Ensures no gaps appear
    height: spacing.medium + 12
  };

  const lineBottomStyle: ViewStyle =
  {
    ...lineStyle,
    top: spacing.medium + 12,
    bottom: -1 // Ensures no gaps appear
  };

  return (
    <View style={style}>
      <View style={dotLineStyle}>
        {info.item.itemIndex !== 0 && <View style={lineTopStyle} />}
        <View style={styles.marginBottom} />
        <Circle
          shade={info.item.itemIndex === highlightIndex ? 'bright' : 'front'}
          size="small"
          style={styles.marginBottom}
        />
        {info.item.itemIndex !== info.item.itemCount - 1 && <View style={lineBottomStyle} />}
      </View>
      {renderItem?.(info)}
    </View>
  );
}, propsAreEqual);

export default TimelineItem;
