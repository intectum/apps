import { TextStyle, ViewStyle } from 'react-native';

export type Length<T> = ((value: T) => number) | number;

export interface Styles
{
  centerContent: ViewStyle;
  row: ViewStyle;
  rowEnd: ViewStyle;
  overlayTopLeft: ViewStyle;
  overlayTopRight: ViewStyle;
  overlayBottomLeft: ViewStyle;
  overlayBottomRight: ViewStyle;
  flex1: ViewStyle;
  margin: ViewStyle;
  marginSmall: ViewStyle;
  marginLarge: ViewStyle;
  marginShort: ViewStyle;
  marginRight: ViewStyle;
  marginRightSmall: ViewStyle;
  marginBottom: ViewStyle;
  marginBottomSmall: ViewStyle;
  rounded: ViewStyle;
  roundedSmall: ViewStyle;
  padding: ViewStyle;
  paddingSmall: ViewStyle;
  paddingLarge: ViewStyle;
  paddingShort: ViewStyle;
  centerText: TextStyle;
  bold: TextStyle;
}

export interface SectionListData<T>
{
  title: string;
  data: SectionListItem<T>[];
}

export interface SectionListFlatItem<T>
{
  item?: T;
  meta: SectionListFlatMeta;
}

export interface SectionListFlatMeta extends SectionListMeta
{
  flatIndex: number;
}

export interface SectionListLengths<T>
{
  itemLength: Length<SectionListFlatItem<T>>;
  sectionHeaderLength?: Length<SectionListFlatItem<T>>;
  sectionFooterLength?: Length<SectionListFlatItem<T>>;
}

export type SectionListItem<T> = T & SectionListMeta;

export interface SectionListMeta
{
  itemCount: number;
  itemIndex: number;
  sectionIndex: number;
  sectionItemIndex: number;
}
