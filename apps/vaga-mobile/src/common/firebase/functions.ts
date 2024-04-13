import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import { Linking } from 'react-native';

import { User } from 'vaga-core';

export const acceptInvitation = async (id: string, source: string) =>
{
  const result = await functions().httpsCallable('acceptInvitation')({ id });
  const sender = result.data as User;

  await analytics().logEvent(
    'accept_invitation',
    {
      source,
      senderId: sender.id
    }
  );

  return sender;
};

export const authorizeWithGoogle = async () =>
{
  const idToken = await auth().currentUser?.getIdToken();

  const result = await functions().httpsCallable('authorizeWithGoogle')({ idToken });

  await Linking.openURL(result.data);
};

export const deleteAccount = async () =>
{
  await functions().httpsCallable('deleteAccount')();
};

export const findUsersByInvitation = async () =>
{
  const result = await functions().httpsCallable('findUsersByInvitation')();
  return result.data as User[];
};

export const findUsersByPhoneNumber = async (phoneNumbers: string[]) =>
{
  const result = await functions().httpsCallable('findUsersByPhoneNumber')({ phoneNumbers });
  return result.data as User[];
};

export const unfriend = async (userId: string) =>
{
  await functions().httpsCallable('unfriend')({ userId });
};

export const updateGoogleCalendarChannel = async () =>
{
  await functions().httpsCallable('updateGoogleCalendarChannel')();
};
