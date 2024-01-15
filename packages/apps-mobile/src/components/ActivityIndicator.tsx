import { FC } from 'react';
import { ActivityIndicator as ReactNativeActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { useThemes } from '..//themes';
import { Themeable } from '..//types';

export type Props = Themeable & ActivityIndicatorProps;

const ActivityIndicator: FC<Props> = ({ theme, shade, ...activityIndicatorProps }) =>
{
  const themes = useThemes(theme);

  return <ReactNativeActivityIndicator size="large" color={themes.current[shade ?? 'bright']} {...activityIndicatorProps} />;
};

export default ActivityIndicator;
