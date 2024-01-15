import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Platform } from 'react-native';

import Button, { Props as ButtonProps } from './Button';
import Icon from './Icon';

export type Props = ButtonProps;

const BackButton: FC<Props> = buttonProps =>
{
  const navigation = useNavigation();

  return (
    <Button circle onPress={() => navigation.goBack()} {...buttonProps}>
      <Icon icon={Platform.OS === 'android' ? 'arrow-left' : 'chevron-left'} />
    </Button>
  );
};

export default BackButton;
