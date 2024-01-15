import { faHandSpock } from '@fortawesome/free-solid-svg-icons/faHandSpock';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import analytics from '@react-native-firebase/analytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';

import { ActivityIndicator, Button, Container, styles, Text, usePersistentState } from 'apps-mobile';

import { CurrentUserContext, useCurrentUserId } from '../common/current-user';
import native from '../common/native';
import { RootStackParamList } from '../common/types';
import Screen from '../components/Screen';

const Intro: FC<NativeStackScreenProps<RootStackParamList, 'Intro'>> = ({ navigation }) =>
{
  const { currentUser } = useContext(CurrentUserContext);

  const currentUserId = useCurrentUserId();
  const [ onboarded ] = usePersistentState('onboarded', false);

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'Intro' });
  }, []);

  useEffect(() =>
  {
    if (!currentUser.id || onboarded === undefined)
    {
      return;
    }

    navigation.replace(onboarded ? 'Home' : 'Permissions');
  }, [ currentUser, navigation, onboarded ]);

  const fixedHeightStyle: ViewStyle =
  {
    height: 40
  };

  return (
    <Screen deepLinkUrlWhitelist={[]}>
      <Container safeAreaType="full" style={{ ...styles.centerContent, ...styles.flex1, ...styles.padding }}>
        <Text size="large" style={{ ...styles.marginBottom, ...styles.centerText }}>Welcome to MadFam</Text>
        <Text style={{ ...styles.marginBottom, ...styles.centerText }}>The world is yours for the taking, now go seize it with your friends</Text>
        <FontAwesomeIcon icon={faHandSpock} size={96} style={styles.marginBottom} />
        <View style={fixedHeightStyle}>
          {!currentUserId &&
            <Button shade="bright" onPress={() => native.signIn()}>
              <Text>Get started</Text>
            </Button>
          }
          {currentUserId && <ActivityIndicator />}
        </View>
      </Container>
    </Screen>
  );
};

export default Intro;
