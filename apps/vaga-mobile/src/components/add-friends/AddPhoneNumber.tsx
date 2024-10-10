import analytics from '@react-native-firebase/analytics';
import { phone } from 'phone';
import { FC, useContext, useState } from 'react';
import { View, ViewStyle } from 'react-native';

import { Button, Icon, styles, Text, TextInput, updateDocument } from 'apps-mobile';
import { User } from 'vaga-core';

import { CurrentUserContext } from '../../common/current-user';
import Flag from '../Flag';

interface Props
{
  onSkip?: () => void;
}

const AddPhoneNumber: FC<Props> = ({ onSkip }) =>
{
  const { currentUser } = useContext(CurrentUserContext);
  const [ phoneNumber, setPhoneNumber ] = useState(currentUser.phoneNumber ?? '+');

  const updatePhoneNumber = async () =>
  {
    await updateDocument<User>('users', currentUser.id, { phoneNumber: phoneResult.phoneNumber ?? undefined });

    await analytics().logEvent('add_phone_number');
  };

  const phoneResult = phone(phoneNumber);

  const textInputStyle: ViewStyle =
  {
    ...styles.marginBottom,
    width: '75%'
  };

  return (
    <View style={{ ...styles.centerContent, ...styles.flex1 }}>
      <Text size="large" style={{ ...styles.marginBottom, ...styles.centerText }}>Join your friends</Text>
      <Text style={{ ...styles.marginBottom, ...styles.centerText }}>Connect with your friends already using Vagabond</Text>
      <Icon icon="user-group" size={96} style={styles.marginBottom} />
      <Text style={{ ...styles.marginBottom, ...styles.centerText }}>Enter your phone number</Text>
      <TextInput
        shade="accent"
        size="large"
        autoFocus
        keyboardType="phone-pad"
        prefix={<Flag isoCode={phoneResult.countryIso2 ?? undefined} />}
        value={phoneNumber}
        style={textInputStyle}
        onChangeText={setPhoneNumber}
        onEndEditing={() => phoneResult.isValid && updatePhoneNumber()}
      />
      <Text shade="middle" size="small" style={styles.marginBottom}>We'll need permission to read your contacts</Text>
      <Button
        shade="accent"
        disabled={!phoneResult.isValid}
        style={styles.marginBottom}
        onPress={updatePhoneNumber}
      >
        <Text>Find friends</Text>
      </Button>
      {onSkip &&
        <Button onPress={onSkip}>
          <Text>Skip</Text>
        </Button>
      }
    </View>
  );
};

export default AddPhoneNumber;
