import { Insets, ViewStyle } from 'react-native';
import { DimensionValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { Size } from 'apps-core';

import { Styles } from './types';

const fontSizeBase = 16;
const roundingBase = 8;
const spacingBase = 16;

export const fontSizes: Record<Size, number> =
{
  small: fontSizeBase * 0.75,
  medium: fontSizeBase,
  large: fontSizeBase * 1.25
};

const lineHeight = 1.25;

export const lineHeights: Record<Size, number> =
{
  small: fontSizes.small * lineHeight,
  medium: fontSizes.medium * lineHeight,
  large: fontSizes.large * lineHeight
};

export const rounding: Record<Size, number> =
{
  small: roundingBase * 0.5,
  medium: roundingBase,
  large: roundingBase * 2
};

export const spacing: Record<Size, number> =
{
  small: spacingBase * 0.5,
  medium: spacingBase,
  large: spacingBase * 2
};

export const styles: Styles =
{
  centerContent:
  {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row:
  {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowEnd:
  {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlayTopLeft:
  {
    position: 'absolute',
    left: spacing.medium,
    top: spacing.medium,
    zIndex: 1
  },
  overlayTopRight:
  {
    position: 'absolute',
    right: spacing.medium,
    top: spacing.medium,
    zIndex: 1
  },
  overlayBottomLeft:
  {
    position: 'absolute',
    left: spacing.medium,
    bottom: spacing.medium,
    zIndex: 1
  },
  overlayBottomRight:
  {
    position: 'absolute',
    right: spacing.medium,
    bottom: spacing.medium,
    zIndex: 1
  },
  flex1:
  {
    flex: 1
  },
  margin:
  {
    margin: spacing.medium
  },
  marginSmall:
  {
    margin: spacing.small
  },
  marginLarge:
  {
    marginHorizontal: spacing.large
  },
  marginShort:
  {
    marginHorizontal: spacing.medium,
    marginVertical: spacing.small
  },
  marginRight:
  {
    marginRight: spacing.medium
  },
  marginRightSmall:
  {
    marginRight: spacing.small
  },
  marginBottom:
  {
    marginBottom: spacing.medium
  },
  marginBottomSmall:
  {
    marginBottom: spacing.small
  },
  rounded:
  {
    borderRadius: rounding.medium
  },
  roundedSmall:
  {
    borderRadius: rounding.small
  },
  padding:
  {
    padding: spacing.medium
  },
  paddingSmall:
  {
    padding: spacing.small
  },
  paddingLarge:
  {
    padding: spacing.large
  },
  paddingShort:
  {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small
  },
  centerText:
  {
    textAlign: 'center'
  },
  bold:
  {
    fontWeight: 'bold'
  }
};

export const getPaddingAsInsets = (style: ViewStyle) =>
{
  const insets: Insets =
  {
    left: dimensionAsNumber(style.paddingLeft ?? style.paddingHorizontal ?? style.padding),
    right: dimensionAsNumber(style.paddingRight ?? style.paddingHorizontal ?? style.padding),
    top: dimensionAsNumber(style.paddingTop ?? style.paddingVertical ?? style.padding),
    bottom: dimensionAsNumber(style.paddingBottom ?? style.paddingVertical ?? style.padding)
  };

  return insets;
};

const dimensionAsNumber = (value: DimensionValue | undefined) =>
{
  if (typeof value !== 'number')
  {
    return undefined;
  }

  return value;
};
