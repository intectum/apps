import { createContext, FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { NativeEventEmitter } from 'react-native';

import { useDocument, useDocuments } from 'apps-mobile';
import { User, UserPrivate } from 'madfam-core';

import native from './native';

export const useCurrentUserId = () =>
{
  const [ currentUserId, setCurrentUserId ] = useState<string>();

  useEffect(() =>
  {
    const updateCurrentUserId = async () =>
    {
      setCurrentUserId((await native.getCurrentUserId()) ?? undefined);
    };

    updateCurrentUserId();

    const eventEmitter = new NativeEventEmitter(native);
    const signInListener = eventEmitter.addListener('signInComplete', updateCurrentUserId);
    const signOutListener = eventEmitter.addListener('signOutComplete', updateCurrentUserId);

    return () =>
    {
      signInListener.remove();
      signOutListener.remove();
    };
  }, []);

  return currentUserId;
};

interface Context
{
  currentUser: User;
  currentUserPrivate: UserPrivate;
  friends: User[];
  currentUserAndFriends: User[];
}

const defaultContext: Context = { currentUser: { id: '', timeline: [] }, currentUserPrivate: { id: '', friendIds: [] }, friends: [], currentUserAndFriends: [] };

export const CurrentUserContext = createContext<Context>(defaultContext);

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) =>
{
  const currentUserId = useCurrentUserId();
  const currentUser = useDocument<User>('users', currentUserId) ?? defaultContext.currentUser;
  const currentUserPrivate = useDocument<UserPrivate>(currentUserId ? `users/${currentUserId}/userPrivates` : '', 'private') ?? defaultContext.currentUserPrivate;

  const friendIds = useMemo(() => currentUserPrivate.friendIds, [ currentUserPrivate ]);
  const friends = useDocuments<User>('users', friendIds) ?? defaultContext.friends;

  const currentUserAndFriends = useMemo(() => [ currentUser, ...friends ], [ currentUser, friends ]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, currentUserPrivate, friends, currentUserAndFriends }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
