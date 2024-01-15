import { useWindowDimensions } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useDimensions = () =>
{
  const safeAreaInsets = useSafeAreaInsets();
  const originalWindowDimensions = useWindowDimensions();

  const windowDimensions = { ...originalWindowDimensions };
  if (!isEmulatorSync())
  {
    windowDimensions.width += safeAreaInsets.left + safeAreaInsets.right;
    windowDimensions.height += safeAreaInsets.top + safeAreaInsets.bottom;
  }

  return { safeAreaInsets, windowDimensions };
};
