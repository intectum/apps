import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeContext, useThemes } from 'apps-mobile';
import { stoneBlue } from 'madfam-core';

import { initConfig } from './common/config';
import { CurrentUserProvider, useCurrentUserId } from './common/current-user';
import './common/fontawesome';
import { updateLocation } from './common/location';
import native from './common/native';
import { RootStackParamList } from './common/types';
import AddFriends from './screens/AddFriends';
import ConnectCalendar from './screens/ConnectCalendar';
import Friends from './screens/Friends';
import HeatMap from './screens/HeatMap';
import Home from './screens/Home';
import Intro from './screens/Intro';
import Permissions from './screens/Permissions';
import Profile from './screens/Profile';
import Stop from './screens/Stop';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () =>
{
  const colorScheme = useColorScheme();

  const currentUserId = useCurrentUserId();
  const themes = useThemes(stoneBlue(colorScheme === 'dark'));

  useEffect(() =>
  {
    initConfig();
    Orientation.lockToPortrait();
  }, []);

  useEffect(() =>
  {
    if (currentUserId)
    {
      analytics().setUserId(currentUserId);
      crashlytics().setUserId(currentUserId);

      native.updateFcmTokenInBackground(60 * 24 * 30 /* every month */);
      updateLocation();
    }
  }, [ currentUserId ]);

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={themes}>
        <CurrentUserProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Intro"
              screenOptions={{
                statusBarTranslucent: true,
                statusBarColor: 'transparent',
                headerShown: false
              }}
            >
              <Stack.Screen name="AddFriends" component={AddFriends} />
              <Stack.Screen name="ConnectCalendar" component={ConnectCalendar} />
              <Stack.Screen name="Friends" component={Friends} />
              <Stack.Screen name="HeatMap" component={HeatMap} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Intro" component={Intro} />
              <Stack.Screen name="Permissions" component={Permissions} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Stop" component={Stop} />
            </Stack.Navigator>
          </NavigationContainer>
        </CurrentUserProvider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
