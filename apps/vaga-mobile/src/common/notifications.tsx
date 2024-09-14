import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types';
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { Button, deleteDocument, Modal, styles, Text } from 'apps-mobile';

import { acceptInvitation } from './firebase/functions';
import { Notification, RootStackParamList } from './types';

export interface Context
{
  notification?: Notification;
  setNotification: (notification: Notification | undefined) => void;
}

export const NotificationContext = createContext<Context>({} as Context);

interface Props
{
  forwardInitialNotification?: boolean;
}

export const NotificationProvider: FC<PropsWithChildren<Props>> = ({ forwardInitialNotification, children })=>
{
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const [ notification, setNotification ] = useState<Notification>();
  const [ thinking, setThinking ] = useState(false);

  const invitationId = notification?.data?.invitationId as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = notification?.data?.userId !== (route.params as any)?.userId ? notification?.data?.userId as string : undefined;
  const showOkay = !invitationId && !userId;

  const openProfile = useCallback(() =>
  {
    if (!notification?.data || !userId)
    {
      return;
    }

    navigation.push(
      'Profile',
      {
        userId: userId,
        initialScrollIndex: notification.data.initialScrollIndex ? Number(notification.data.initialScrollIndex) : undefined
      }
    );
  }, [ navigation, notification, userId ]);

  useEffect(() =>
  {
    if (!isFocused)
    {
      return;
    }

    return messaging().onMessage(message => setNotification({ ...message.notification, data: message.data }));
  }, [ isFocused, route, setNotification ]);

  useEffect(() =>
  {
    if (!forwardInitialNotification)
    {
      return;
    }

    const forward = (message: FirebaseMessagingTypes.RemoteMessage | null) =>
    {
      if (!message)
      {
        return;
      }

      if (message.data?.invitationId)
      {
        navigation.push('AddFriends', { onboarding: false });
      }
      else if (message.data?.userId)
      {
        openProfile();
      }
    };

    messaging().getInitialNotification().then(forward);
    return messaging().onNotificationOpenedApp(forward);
  }, [ forwardInitialNotification, navigation, openProfile ]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
      <Modal
        theme={notification?.theme}
        shade={notification?.shade}
        transparent
        visible={!!notification}
        onRequestClose={() => setNotification(undefined)}
      >
        {notification?.title && <Text style={{ ...styles.marginBottom, ...styles.bold }}>{notification.title}</Text>}
        {notification?.body && <Text style={styles.marginBottom}>{notification.body}</Text>}
        <View style={styles.rowEnd}>
          {showOkay &&
            <Button
              shade="accent"
              onPress={() => setNotification(undefined)}
            >
              <Text>Okay</Text>
            </Button>
          }
          {invitationId &&
            <>
              <Button
                disabled={thinking}
                style={styles.marginRightSmall}
                onPress={async () =>
                {
                  setThinking(true);
                  await deleteDocument('invitations', invitationId);
                  setNotification(undefined);
                  setThinking(false);
                }}
              >
                <Text>Deny</Text>
              </Button>
              <Button
                shade="accent"
                disabled={thinking}
                onPress={async () =>
                {
                  setThinking(true);
                  await acceptInvitation(invitationId, 'notification');
                  setNotification(undefined);
                  setThinking(false);
                }}
              >
                <Text>Accept</Text>
              </Button>
            </>
          }
          {userId &&
            <Button
              shade="accent"
              onPress={() =>
              {
                openProfile();
                setNotification(undefined);
              }}
            >
              <Text>Open profile</Text>
            </Button>
          }
        </View>
      </Modal>
    </NotificationContext.Provider>
  );
};
