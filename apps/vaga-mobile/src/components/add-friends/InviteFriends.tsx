import { FC, useContext, useEffect, useState } from 'react';
import { Linking, Share } from 'react-native';

import { Button, Icon, setDocument, styles, Text } from 'apps-mobile';
import { Invitation, toInvitationUrl } from 'vaga-core';

import { CurrentUserContext } from '../../common/current-user';

const InviteFriends: FC = () =>
{
  const { currentUser } = useContext(CurrentUserContext);
  const [ invitationId, setInvitationId ] = useState<string>();
  const [ whatsappAvailable, setWhatsappAvailable ] = useState(false);

  useEffect(() =>
  {
    setDocument<Invitation>('invitations', { senderId: currentUser.id }).then(setInvitationId);
    Linking.canOpenURL('whatsapp://send').then(setWhatsappAvailable);
  }, [ currentUser.id ]);

  const getMessage = (theInvitationId: string) => `Let's get in sync: ${toInvitationUrl(theInvitationId)}`;

  return (
    <>
      {whatsappAvailable &&
        <Button
          theme={{
            light: '',
            medium: '',
            dark: '#000000',
            accent: '#25d366',
            front: '',
            back: ''
          }}
          shade="accent"
          style={styles.marginBottomSmall}
          onPress={() => invitationId && Linking.openURL(`whatsapp://send?text=${encodeURIComponent(getMessage(invitationId))}`)}
        >
          <Icon icon={[ 'fab', 'whatsapp' ]} style={styles.marginRightSmall} />
          <Text>Invite from WhatsApp</Text>
        </Button>
      }
      <Button
        shade={!whatsappAvailable ? 'accent' : undefined}
        onPress={() => invitationId && Share.share({ message: getMessage(invitationId) })}
      >
        <Icon icon="share-nodes" style={styles.marginRightSmall} />
        <Text>Invite using link</Text>
      </Button>
    </>
  );
};

export default InviteFriends;
