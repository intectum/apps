import { FC, useContext } from 'react';
import { ModalProps, NativeSyntheticEvent, View, ViewStyle } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { Button, fontSizes, Icon, Modal, styles, useThemes } from 'apps-mobile';
import { toInvitationId } from 'vaga-core';

import { acceptInvitation } from '../../common/firebase/functions';
import { NotificationContext } from '../../common/notifications';

const QrCodeScanner: FC<ModalProps> = modalProps =>
{
  const { setNotification } = useContext(NotificationContext);

  const themes = useThemes();

  const containerStyle: ViewStyle =
  {
    backgroundColor: themes.monochrome.dark
  };

  return (
    <Modal {...modalProps}>
      <View style={styles.rowEnd}>
        <Button circle onPress={modalProps.onRequestClose}>
          <Icon icon="x" size={fontSizes.medium} />
        </Button>
      </View>
      <QRCodeScanner
        containerStyle={containerStyle}
        onRead={async event =>
        {
          // Hacky but we never use the event returned anyway...
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          modalProps.onRequestClose?.({} as NativeSyntheticEvent<any>);

          try
          {
            await acceptInvitation(toInvitationId(event.data), 'qr');
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          catch (err: any)
          {
            if (err.message !== 'Invalid invitation.')
            {
              throw err;
            }

            setNotification(
              {
                title: 'Failed to add friend',
                body: 'The QR code may be expired. Please try with a new one.',
                theme: 'fire'
              }
            );
          }
        }}
      />
    </Modal>
  );
};

export default QrCodeScanner;
