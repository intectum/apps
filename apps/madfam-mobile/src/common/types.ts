import { ParamListBase } from '@react-navigation/native';

import { Themeable } from 'apps-mobile';

export interface Notification extends Themeable
{
  title?: string;
  body?: string;
  data?: Record<string, string | object>;
}

export interface RootStackParamList extends ParamListBase
{
  AddStopsFromCalendar: undefined;
  ConnectCalendar: undefined;
  Friends: undefined;
  AddFriends:
  {
    onboarding: boolean;
  };
  HeatMap: undefined;
  Home: undefined;
  Intro: undefined;
  Permissions: undefined;
  Profile:
  {
    userId: string;
    initialScrollIndex?: number;
  };
  Stop:
  {
    userId: string;
    index: number;
  };
}
