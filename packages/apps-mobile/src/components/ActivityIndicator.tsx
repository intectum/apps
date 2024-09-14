import { FC } from 'react';
import { ActivityIndicator as ReactNativeActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { Themeable } from 'apps-core';

import { useThemes } from '../themes';

export type Props = Themeable & ActivityIndicatorProps;

const ActivityIndicator: FC<Props> = ({ theme, shade, ...activityIndicatorProps }) =>
{
  const themes = useThemes(theme);

  return <ReactNativeActivityIndicator size="large" color={themes.current[shade ?? 'accent']} {...activityIndicatorProps} />;
};

export default ActivityIndicator;
