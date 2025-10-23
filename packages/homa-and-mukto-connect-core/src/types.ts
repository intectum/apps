type Record = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type New<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>

export type Address = Record &
{
  latitude: number;
  longitude: number;
  meta?: {
    address_components: AddressComponent[];
    formatted_address: string;
  };
  user_id: string;
};

export type Credentials =
{
  email: string;
  password: string;
};

export type Registration = Omit<User, 'address.user_id'> & Credentials;

export type User = Record &
{
  name: string;
  image: string;
  contacts: Contact[];
  groups: Group[];
  address?: Address;
};

export type FullUser = User & Credentials & { admin: boolean };

export type Contact =
{
  type: string;
  value: string;
};

export type Group =
{
  type: string;
  location: string;
  month: number;
  year: number;
};

export type Token =
{
  access_token: string;
  access_token_expires_at?: string;
  refresh_token?: string;
  refresh_token_expires_at?: string;
  user_id: string;
  user?: FullUser;
};

export type TokenCamelCase =
{
  accessToken: string;
  accessTokenExpiresAt?: string;
  refreshToken?: string;
  refreshTokenExpiresAt?: string;
  user: FullUser;
};

// Google Cloud

export type GeocodeResponse =
{
  results: GeocodeResult[];
  status: 'INVALID_REQUEST' | 'OK' | 'OVER_DAILY_LIMIT' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR' | 'ZERO_RESULTS';
};

export type GeocodeResult =
{
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  partial_match: boolean;
  place_id: string;
  plus_code: string;
  types: PlaceType[];
};

export type AddressComponent =
{
  long_name: string;
  short_name: string;
  types: PlaceType[];
};

export type Geometry =
{
  bounds: LatLngBounds;
  location: LatLngShort;
  location_type: LocationType;
  viewport: LatLngBounds;
};

export type LatLngBounds =
{
  northeast: LatLngShort;
  southwest: LatLngShort;
};

export type LatLngShort =
{
  lat: number;
  lng: number;
};

export type LocationType = 'APPROXIMATE' | 'GEOMETRIC_CENTER' | 'RANGE_INTERPOLATED' | 'ROOFTOP';

// There are many more place types, but we only care about these...
export type PlaceType =
  'administrative_area_level_1' |
  'administrative_area_level_2' |
  'administrative_area_level_3' |
  'administrative_area_level_4' |
  'administrative_area_level_5' |
  'administrative_area_level_6' |
  'administrative_area_level_7' |
  'country' |
  'locality';

export type PlacesAutocompleteResponse =
{
  suggestions: PlacesAutocompleteSuggestion[];
};

export type PlacesAutocompleteSuggestion =
{
  placePrediction: PlacesAutocompletePrediction;
};

export type PlacesAutocompletePrediction =
{
  place: string;
  placeId: string;
  text: PlaceAutocompleteText;
  structuredFormat: PlaceAutocompleteStructuredFormat;
  types: PlaceType[];
};

export type PlaceAutocompleteText =
{
  text: string;
  matches?: PlaceAutocompleteMatch[];
};

export type PlaceAutocompleteMatch =
{
  endOffset: number;
};

export type PlaceAutocompleteStructuredFormat =
{
  mainText: PlaceAutocompleteText;
  secondaryText: PlaceAutocompleteText;
};
