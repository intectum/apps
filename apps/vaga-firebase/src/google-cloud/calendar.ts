import * as admin from 'firebase-admin';
import { projectID } from 'firebase-functions/params';
import { HttpsError, onCall, onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { google } from 'googleapis';
import { DateTime } from 'luxon';

import { fromIsoString } from 'apps-core';
import { getDocument, fromDocument, updateDocument } from 'apps-firebase';
import {
  Address,
  addStop,
  autocomplete,
  formatAddress,
  geocode,
  Source,
  Stop,
  User,
  UserPrivate
} from '../../../../packages/vaga-core';

import { notifyUser } from '../firebase/messaging';
import { isDev } from '../firebase/params';
import { CalendarEvent } from '../types';
import { getOAuthClientForUser } from './oauth';

const calendar = google.calendar('v3');

export const watchGoogleCalendar = async (user: User, userPrivate: UserPrivate) =>
{
  const auth = await getOAuthClientForUser(user, userPrivate);

  if (userPrivate.google?.calendar?.resourceId)
  {
    await calendar.channels.stop(
      {
        auth,
        requestBody:
        {
          id: user.id,
          resourceId: userPrivate.google.calendar.resourceId
        }
      }
    );
  }

  const response = await calendar.events.watch(
    {
      auth,
      calendarId: 'primary',
      requestBody: {
        id: user.id,
        type: 'web_hook',
        address: `https://us-central1-${projectID.value()}.cloudfunctions.net/watchGoogleCalendarCallback`
      }
    });

  if (response.data.resourceId)
  {
    await updateDocument<{ id: string; 'google.calendar.resourceId': string; 'google.calendar.channelExpiresAt'?: Date; }>(
      `users/${user.id}/userPrivates`,
      'private',
      {
        'google.calendar.resourceId': response.data.resourceId,
        'google.calendar.channelExpiresAt': response.data.expiration ? new Date(Number(response.data.expiration)) : undefined
      }
    );
  }
};

export const watchGoogleCalendarCallback = onRequest(async (request, response) =>
{
  const userId = request.headers['x-goog-channel-id'] as string;
  await syncWithGoogleCalendar(userId);

  response.writeHead(200);
  response.end();
});

const syncWithGoogleCalendar = async (userId: string) =>
{
  const currentUser = await getDocument<User>('users', userId);
  const currentUserPrivate = await getDocument<UserPrivate>(`users/${userId}/userPrivates`, 'private');
  if (!currentUser || !currentUserPrivate)
  {
    return 0;
  }

  const flightEvents = await getCalendarEvents(currentUser, currentUserPrivate, 'Flight to');
  const trainEvents = await getCalendarEvents(currentUser, currentUserPrivate, 'Train to');
  const events = [ ...flightEvents, ...trainEvents ].sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  const stacks = stackCalendarEvents(events);

  const syncedEvents: CalendarEvent[] = [];
  const syncedAddresses: Address[] = [];
  for (const stack of stacks)
  {
    const previouslySyncedEvents = stack.filter(event => currentUserPrivate.google?.calendar?.syncedEventIds?.includes(event.id));
    if (previouslySyncedEvents.length >= stack.length)
    {
      continue;
    }

    const lastEvent = stack[stack.length - 1];
    const results = await autocomplete(lastEvent.destination);
    if (!results.length)
    {
      continue;
    }

    const address = await geocode(results[0].description);
    if (!address)
    {
      continue;
    }

    const previouslySyncedEventIds = previouslySyncedEvents.map(event => event.id);
    const existingStops = currentUser.timeline.filter(stop =>
      stop.sources?.some(source => source.type === 'google-calendar' && previouslySyncedEventIds.includes(source.id)));
    for (const existingStop of existingStops)
    {
      currentUser.timeline.splice(currentUser.timeline.indexOf(existingStop), 1);
    }

    const sources = stack.map<Source>(event => ({ id: event.id, type: 'google-calendar', url: event.url }));
    const newStop: Stop = { address, arrivedAt: fromIsoString(lastEvent.endedAt), sources };
    addStop(currentUser.timeline, newStop);

    syncedEvents.push(...stack.filter(event => !previouslySyncedEvents.includes(event)));
    syncedAddresses.push(address);
  }

  if (!syncedEvents.length)
  {
    return 0;
  }

  const batch = admin.firestore().batch();
  await updateDocument<User>('users', userId, { timeline: currentUser.timeline }, batch);
  await updateDocument<{ id: string; 'google.calendar.syncedEventIds': string[]; }>(
    `users/${userId}/userPrivates`,
    'private',
    {
      'google.calendar.syncedEventIds':
      [
        ...(currentUserPrivate.google?.calendar?.syncedEventIds ?? []),
        ...syncedEvents.map(event => event.id)
      ]
    },
    batch
  );
  await batch.commit();

  const syncedEventIds = syncedEvents.map(event => event.id);
  const initialScrollIndex = currentUser.timeline.findIndex(stop =>
    stop.sources?.some(source => source.type === 'google-calendar' && syncedEventIds.includes(source.id)));

  await notifyUser(
    currentUser.id,
    syncedAddresses.length === 1 ? `Going to ${formatAddress(syncedAddresses[0], 'short')}?` : 'Synced events',
    `We've synced ${syncedEvents.length === 1 ? 'an event' : `${syncedEvents.length} events`} from Google Calendar to your timeline`,
    {
      userId: currentUser.id,
      initialScrollIndex: initialScrollIndex.toString()
    }
  );

  return syncedEvents.length;
};

export const updateGoogleCalendarChannel = onCall({ enforceAppCheck: !isDev() }, async request =>
{
  if (!request.auth)
  {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const user = await getDocument<User>('users', request.auth.uid);
  const userPrivate = await getDocument<UserPrivate>(`users/${request.auth.uid}/userPrivates`, 'private');
  if (!user || !userPrivate)
  {
    return;
  }

  await watchGoogleCalendar(user, userPrivate);
});

export const updateGoogleCalendarChannels = onSchedule('every day 00:00', async () =>
{
  const now = DateTime.now();

  const querySnapshot = await admin.firestore().collectionGroup('userPrivates').get();
  for (const documentSnapshot of querySnapshot.docs)
  {
    const userPrivate = await fromDocument<UserPrivate>(documentSnapshot);
    if (!userPrivate?.google?.calendar?.channelExpiresAt)
    {
      continue;
    }

    const channelExpiresAt = DateTime.fromJSDate(userPrivate.google.calendar.channelExpiresAt);
    const daysUntilChannelExpiry = channelExpiresAt.diff(now, 'days').toObject().days as number;
    if (daysUntilChannelExpiry > 1.5)
    {
      continue;
    }

    const userId = documentSnapshot.ref.path.match(/users\/([^/]+)\/userPrivates\/private/)?.[1];
    if (!userId)
    {
      continue;
    }

    const user = await getDocument<User>('users', userId);
    if (!user)
    {
      continue;
    }

    await watchGoogleCalendar(user, userPrivate);
  }
});

const getCalendarEvents = async (user: User, userPrivate: UserPrivate, prefix: string) =>
{
  const auth = await getOAuthClientForUser(user, userPrivate);
  let nextPageToken: string | undefined;
  const events: CalendarEvent[] = [];

  do
  {
    const response = await calendar.events.list(
      {
        auth,
        calendarId: 'primary',
        maxResults: 10,
        singleEvents: true,
        q: prefix,
        orderBy: 'startTime',
        pageToken: nextPageToken
      }
    );

    if (!response.data.items)
    {
      continue;
    }

    for (const event of response.data.items)
    {
      const startedAt = event.start?.dateTime ?? event.start?.date ?? undefined;
      const endedAt = event.end?.dateTime ?? event.end?.date ?? undefined;
      if (!event.id || !event.summary || !startedAt || !endedAt)
      {
        continue;
      }

      const destination = event.summary.match(`^${prefix} ([^(]+)`)?.[1].trim();
      if (!destination)
      {
        continue;
      }

      events.push({ id: event.id, destination, startedAt, endedAt, url: event.htmlLink ?? undefined });
    }

    nextPageToken = response.data.nextPageToken ?? undefined;
  }
  while (nextPageToken);

  return events;
};

const stackCalendarEvents = (events: CalendarEvent[]) =>
{
  const stacks: CalendarEvent[][] = [];

  for (let index = 0; index < events.length; index++)
  {
    const previousEvent = events[index - 1] as CalendarEvent | undefined;
    const event = events[index];

    const previousEndedAt = previousEvent && DateTime.fromISO(previousEvent.endedAt);
    const startedAt = DateTime.fromISO(event.startedAt);

    const addToStack = !!previousEndedAt && (startedAt.diff(previousEndedAt, 'days').toObject().days as number) < 1;
    if (addToStack)
    {
      stacks[stacks.length - 1].push(event);
    }
    else
    {
      stacks.push([ event ]);
    }
  }

  return stacks;
};
