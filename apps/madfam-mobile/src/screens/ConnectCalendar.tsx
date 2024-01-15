import analytics from '@react-native-firebase/analytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useEffect } from 'react';
import { Image, View, ViewStyle } from 'react-native';

import { Button, Container, spacing, styles, Text, usePersistentState, useThemes } from 'apps-mobile';

import { authorizeWithGoogle } from '../common/firebase/functions';
import { RootStackParamList } from '../common/types';
import Screen from '../components/Screen';

const ConnectCalendar: FC<NativeStackScreenProps<RootStackParamList, 'ConnectCalendar'>> = ({ navigation }) =>
{
  const [ _, setOnboarded ] = usePersistentState<boolean>('onboarded');
  const themes = useThemes();

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'ConnectCalendar' });
  }, []);

  const connect = async () =>
  {
    await authorizeWithGoogle();

    await analytics().logEvent(
      'authorize_with_google',
      {
        source: 'connect-calendar'
      }
    );
  };

  const continueOnboarding = () =>
  {
    navigation.replace('Home');
    setOnboarded(true);
  };

  const imageStyle: ViewStyle =
  {
    ...styles.marginBottom,
    ...styles.paddingLarge,
    borderRadius: 96 / 2 + spacing.large,
    backgroundColor: themes.monochrome.light
  };

  return (
    <Screen deepLinkUrlWhitelist={[ 'madfam://google-authorized' ]}>
      <Container safeAreaType="full" style={{ ...styles.centerContent, ...styles.flex1, ...styles.padding }}>
        <Text size="large" style={{ ...styles.marginBottom, ...styles.centerText }}>Google Calendar</Text>
        <Text style={{ ...styles.marginBottom, ...styles.centerText }}>Automatically add travel plans from your calendar</Text>
        <View style={imageStyle}>
          <Image source={require('../images/google-calendar.png')} />
        </View>
        <Button shade="bright" style={styles.marginBottom} onPress={connect}>
          <Text>Connect</Text>
        </Button>
        <Button onPress={continueOnboarding}>
          <Text>Skip</Text>
        </Button>
      </Container>
    </Screen>
  );
};

export default ConnectCalendar;
