import { DateOnly, Document } from 'apps-core';

export interface Address extends AddressCore
{
  location?: LatLng;
  display?: Address;
}

interface AddressCore
{
  country: string;
  administrativeAreaLevel1?: string;
  administrativeAreaLevel2?: string;
  administrativeAreaLevel3?: string;
  administrativeAreaLevel4?: string;
  administrativeAreaLevel5?: string;
  administrativeAreaLevel6?: string;
  administrativeAreaLevel7?: string;
  locality?: string;
}

export const addressPartsSmallestToBiggest: (keyof AddressCore)[] =
[
  'locality',
  'administrativeAreaLevel7',
  'administrativeAreaLevel6',
  'administrativeAreaLevel5',
  'administrativeAreaLevel4',
  'administrativeAreaLevel3',
  'administrativeAreaLevel2',
  'administrativeAreaLevel1',
  'country'
];

export interface Cache<T>
{
  get: (key: string) => Promise<T>;
}

export interface Config
{
  hostName: string;
  googleApiKey: string;
  addressCache: Cache<Address | undefined>;
}

export interface HeatMap extends Document
{
  date: DateOnly;
  points: WeightedLatLng[];
}

export interface Invitation extends Document
{
  senderId: string;
  recipientId?: string;
}

export interface LatLng
{
  latitude: number;
  longitude: number;
}

export interface Source
{
  id: string;
  type: SourceType;
  url?: string;
}

export type SourceType = 'google-calendar' | 'location';

export const sourceTypePrecedences: Record<SourceType, number> =
{
  'google-calendar': 0,
  'location': 1
};

export interface Stop
{
  address: Address;
  arrivedAt: DateOnly;
  confidence?: number;
  sources?: Source[];
}

export interface User extends Document
{
  displayName?: string;
  phoneNumber?: string;
  photoUrl?: string;
  timeline: Stop[];
}

export interface UserPrivate extends Document
{
  friendIds: string[];
  fcm?: UserPrivateFcm;
  google?: UserPrivateGoogle;
  location?: UserPrivateLocation;
}

export interface UserPrivateFcm
{
  token?: string;
  tokenUpdatedAt?: Date;
}

export interface UserPrivateGoogle
{
  accessToken?: string;
  refreshToken?: string;
  calendar?: UserPrivateGoogleCalendar;
}

export interface UserPrivateGoogleCalendar
{
  resourceId: string;
  channelExpiresAt?: Date;
  syncedEventIds?: string[];
}

export interface UserPrivateLocation
{
  addressKeys: string[];
  updatedAt: DateOnly;
}

export interface WeightedLatLng extends LatLng
{
  weight: number;
}
