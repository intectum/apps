export interface AddressComponent
{
  long_name: string;
  short_name: string;
  types: PlaceType[];
}

export interface GeocodeResponse
{
  results: GeocodeResult[];
  status: 'INVALID_REQUEST' | 'OK' | 'OVER_DAILY_LIMIT' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR' | 'ZERO_RESULTS';
}

export interface GeocodeResult
{
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  partial_match: boolean;
  place_id: string;
  plus_code: string;
  types: PlaceType[];
}

export interface Geometry
{
  bounds: LatLngBounds;
  location: LatLngShort;
  location_type: LocationType;
  viewport: LatLngBounds;
}

export interface LatLngShort
{
  lat: number;
  lng: number;
}

export interface LatLngBounds
{
  northeast: LatLngShort;
  southwest: LatLngShort;
}

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

export interface PlaceAutocompleteMatchedSubstring
{
  length: number;
  offset: number;
}

export interface PlaceAutocompleteStructuredFormat
{
  main_text: string;
  main_text_matched_substrings: PlaceAutocompleteMatchedSubstring[];
  secondary_text?: string;
  secondary_text_matched_substrings?: PlaceAutocompleteMatchedSubstring[];
}

export interface PlaceAutocompleteTerm
{
  offset: number;
  value: string;
}

export interface PlacesAutocompletePrediction
{
  description: string;
  distance_meters?: number;
  matched_substrings: PlaceAutocompleteMatchedSubstring[];
  place_id?: string;
  structured_formatting: PlaceAutocompleteStructuredFormat;
  terms: PlaceAutocompleteTerm[];
  types?: string[];
}

export interface PlacesAutocompleteResponse
{
  error_message: string;
  info_messages: string[];
  predictions: PlacesAutocompletePrediction[];
  status: 'INVALID_REQUEST' | 'OK' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR' | 'ZERO_RESULTS';
}
