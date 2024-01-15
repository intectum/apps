import { FC, useMemo, useRef } from 'react';
import { SectionList, SectionListProps, View, ViewStyle } from 'react-native';

import { toIsoString } from 'apps-core';
import {
  getSectionListItemLayout,
  Length,
  lineHeights,
  Pressable,
  SectionListData,
  SectionListFlatItem,
  SectionListItem,
  spacing,
  styles,
  Text,
  toFlat,
  useSectionListInitialScroll
} from 'apps-mobile';
import { Stop } from 'madfam-core';

import TimelineItem from './TimelineItem';

interface Props extends SectionListProps<SectionListItem<Stop>, SectionListData<Stop>>
{
  highlightIndex?: number;
  initialScrollItemIndex?: number;
  itemLength: Length<SectionListFlatItem<Stop>>;
  onItemPress?: (item: SectionListItem<Stop>) => void;
}

export const timelineSectionHeaderLength = spacing.small * 2 + lineHeights.medium;

const Timeline: FC<Props> = ({ highlightIndex, initialScrollItemIndex, itemLength, onItemPress, ...sectionListProps }) =>
{
  const sectionsFlat = useMemo(() => toFlat(sectionListProps.sections as SectionListData<Stop>[]), [ sectionListProps.sections ]);
  const ref = useRef<SectionList<SectionListItem<Stop>, SectionListData<Stop>>>(null);

  useSectionListInitialScroll(ref, sectionsFlat, initialScrollItemIndex);

  const sectionHeaderStyle: ViewStyle =
  {
    ...styles.centerContent,
    width: spacing.medium * 2 + 24
  };

  return (
    <SectionList
      ref={ref}
      keyExtractor={item => toIsoString(item.arrivedAt)}
      getItemLayout={getSectionListItemLayout(
        sectionsFlat,
        {
          itemLength,
          sectionHeaderLength: timelineSectionHeaderLength
        }
      )}
      renderSectionHeader={({ section }) =>
        <View style={sectionHeaderStyle}>
          <View style={styles.marginBottomSmall} />
          <Text style={styles.marginBottomSmall}>{section.title}</Text>
        </View>
      }
      {...sectionListProps}
      renderItem={info =>
        <Pressable onPress={() => onItemPress?.(info.item)}>
          <TimelineItem
            info={info}
            extraData={sectionListProps.extraData}
            highlightIndex={highlightIndex}
            renderItem={sectionListProps.renderItem}
          />
        </Pressable>
      }
    />
  );
};

export default Timeline;
