import { FC, useContext, useEffect, useState } from 'react';
import { ModalProps, View, ViewStyle } from 'react-native';
import QRCode from 'react-qr-code';

import {
  ActivityIndicator,
  Button,
  fontSizes,
  Icon,
  Modal,
  setDocument,
  styles,
  Text,
  useThemes
} from 'apps-mobile';
import { Invitation, toInvitationUrl } from 'vaga-core';

import { CurrentUserContext } from '../../common/current-user';
import QrCodeScanner from './QrCodeScanner';

const QrCode: FC<ModalProps> = modalProps =>
{
  const { currentUser } = useContext(CurrentUserContext);
  const [ invitationId, setInvitationId ] = useState<string>();
  const [ showScanner, setShowScanner ] = useState(false);

  const themes = useThemes();

  useEffect(() =>
  {
    setDocument<Invitation>('invitations', { senderId: currentUser.id }).then(setInvitationId);
  }, [ currentUser.id ]);

  const qrCodeStyle: ViewStyle =
  {
    ...styles.marginBottom,
    width: 256,
    height: 256,
    backgroundColor: themes.monochrome.dark
  };

  return (
    <>
      <Modal
        transparent
        {...modalProps}
      >
        <View style={styles.rowEnd}>
          <Button circle onPress={modalProps.onRequestClose}>
            <Icon icon="x" size={fontSizes.medium} />
          </Button>
        </View>
        <View style={styles.centerContent}>
          <View style={qrCodeStyle}>
            {!invitationId &&
              <View style={{ ...styles.centerContent, ...styles.flex1 }}>
                <ActivityIndicator />
              </View>
            }
            {invitationId && <QRCode value={toInvitationUrl(invitationId)} />}
          </View>
          <Button
            shade="bright"
            onPress={() => setShowScanner(true)}
          >
            <Icon icon="camera" style={styles.marginRightSmall} />
            <Text>Scan a code</Text>
          </Button>
        </View>
      </Modal>
      <QrCodeScanner
        visible={showScanner}
        onRequestClose={() => setShowScanner(false)}
      />
    </>
  );
};

export default QrCode;
