import analytics from '@react-native-firebase/analytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { FlatList, View, ViewStyle } from 'react-native';

import { Button, Container, Icon, Pressable, styles, Text, useThemes } from 'apps-mobile';

import { CurrentUserContext } from '../common/current-user';
import { RootStackParamList } from '../common/types';
import Header from '../components/Header';
import Screen from '../components/Screen';
import UserCard from '../components/UserCard.tsx';

const Friends: FC<NativeStackScreenProps<RootStackParamList, 'Friends'>> = ({ navigation }) =>
{
  const { friends } = useContext(CurrentUserContext);

  const themes = useThemes();

  useEffect(() =>
  {
    analytics().logScreenView({ screen_name: 'Friends' });
  }, []);

  const dashedOutlineStyle: ViewStyle =
  {
    ...styles.flex1,
    ...styles.margin,
    ...styles.rounded,
    ...styles.padding,
    borderWidth: 2,
    borderColor: themes.current.front,
    borderStyle: 'dashed'
  };

  return (
    <Screen forwardInitialNotification>
      <Header action={() => navigation.push('AddFriends', { onboarding: false })} actionIcon="user-plus">
        <Text size="large">Friends</Text>
      </Header>
      <Container safeAreaType="bottom" style={styles.flex1}>
        {!friends.length &&
          <View style={dashedOutlineStyle}>
            <View style={{ ...styles.centerContent, ...styles.flex1 }}>
              <Icon icon="user-group" size={96} style={styles.marginBottom} />
              <Button shade="bright" onPress={() => navigation.push('AddFriends', { onboarding: false })}>
                <Text>Add friends</Text>
              </Button>
            </View>
          </View>
        }
        {!!friends.length &&
          <FlatList
            data={friends}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <Pressable style={styles.paddingShort} onPress={() => navigation.push('Profile', { userId: item.id })}>
                <UserCard user={item} />
              </Pressable>
            }
          />
        }
      </Container>
    </Screen>
  );
};

export default Friends;
