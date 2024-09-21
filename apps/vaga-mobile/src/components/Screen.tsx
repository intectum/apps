import { FC, PropsWithChildren } from 'react';

import { useDeepLinking } from '../common/deep-linking';
import { NotificationProvider } from '../common/notifications';

interface Props
{
  forwardInitialNotification?: boolean;
  deepLinkUrlWhitelist?: string[];
}

const Screen: FC<PropsWithChildren<Props>> = ({ forwardInitialNotification, deepLinkUrlWhitelist, children }) =>
{
  useDeepLinking(deepLinkUrlWhitelist);

  return (
    <NotificationProvider forwardInitialNotification={forwardInitialNotification}>
      {children}
    </NotificationProvider>
  );
};

export default Screen;
