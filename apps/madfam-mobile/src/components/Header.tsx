import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC, PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

import { BackButton, Button, Container, Icon, styles } from 'apps-mobile';

interface Props
{
  action?: () => void;
  actionIcon?: IconProp;
}

const Header: FC<PropsWithChildren<Props>> = ({ action, actionIcon, children }) =>
{
  const containerStyle: ViewStyle =
  {
    ...styles.row,
    ...styles.padding
  };

  const childrenStyle: ViewStyle =
  {
    ...styles.row,
    ...styles.flex1,
    ...(action ? styles.marginRightSmall : {})
  };

  return (
    <Container safeAreaType="top" style={containerStyle}>
      <BackButton style={styles.marginRightSmall} />
      <View style={childrenStyle}>
        {children}
      </View>
      {action &&
        <Button circle onPress={action}>
          <Icon icon={actionIcon ?? 'ellipsis-vertical'} />
        </Button>
      }
    </Container>
  );
};

export default Header;
