import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types';
import { useContext, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { usePersistentState } from 'apps-mobile';
import { invitationUrlPrefix, toInvitationId } from 'vaga-core';

import { acceptInvitation } from './firebase/functions';
import { NotificationContext } from './notifications';
import { RootStackParamList } from './types';

export const useDeepLinking = (urlWhitelist?: string[]) =>
{
  const { setNotification } = useContext(NotificationContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [ url, setUrl ] = useState<string | null>(null);

  const [ onboarded, setOnboarded ] = usePersistentState<boolean>('onboarded');

  useEffect(() =>
  {
    Linking.getInitialURL().then(setUrl);
    Linking.addEventListener('url', event => setUrl(event.url));
  }, []);

  useEffect(() =>
  {
    if (!url || !urlWhitelist?.includes(url))
    {
      return;
    }

    if (url === 'vaga://google-authorized')
    {
      if (!onboarded)
      {
        navigation.replace('Home');
        setOnboarded(true);
      }
    }
    else if (url.startsWith(invitationUrlPrefix))
    {
      acceptInvitation(toInvitationId(url), 'link')
        .catch(err =>
        {
          if (err.message !== 'Invalid invitation.')
          {
            throw err;
          }

          setNotification(
            {
              title: 'Failed to accept invitation',
              body: 'The link may be expired. Please try with a new one.',
              theme: 'fire'
            }
          );
        });
    }
  }, [ navigation, onboarded, setNotification, setOnboarded, url, urlWhitelist ]);
};
