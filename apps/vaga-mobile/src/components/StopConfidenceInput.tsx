import analytics from '@react-native-firebase/analytics';
import { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { beforeDate, today } from 'apps-core';
import { Button, Emoji, Icon, styles, Text, updateDocument } from 'apps-mobile';
import { User } from 'vaga-core';

interface Props
{
  user: User;
  stopIndex: number;
  source: string;
}

const StopConfidenceInput: FC<PropsWithChildren<Props>> = ({ user, stopIndex, source, children }) =>
{
  const stop = user.timeline[stopIndex];

  const updateConfidence = async (confidence: number) =>
  {
    user.timeline[stopIndex].confidence = confidence;
    await updateDocument<User>('users', user.id, { timeline: user.timeline });

    await analytics().logEvent(
      'stop_confidence',
      {
        source: source
      }
    );
  };

  if (beforeDate(stop.arrivedAt, today()))
  {
    return (
      <>
        <Text size="small" style={styles.marginBottomSmall}>Confirm this stop?</Text>
        <View style={styles.row}>
          <Button shade="accent" circle style={styles.marginRight} onPress={() => updateConfidence(1)}>
            <Icon icon="check" />
          </Button>
          {children}
        </View>
      </>
    );
  }

  return (
    <>
      <Text size="small" style={styles.marginBottomSmall}>How confident are you about this plan?</Text>
      <View style={styles.row}>
        <Button shade="accent" circle style={styles.marginRight} onPress={() => updateConfidence(1)}>
          <Emoji name="slightly_smiling_face" />
        </Button>
        <Button circle style={styles.marginRight} onPress={() => updateConfidence(0.5)}>
          <Emoji name="thinking_face" />
        </Button>
        <Button circle style={styles.marginRight} onPress={() => updateConfidence(0)}>
          <Emoji name="lying_face" />
        </Button>
        {children}
      </View>
    </>
  );
};

export default StopConfidenceInput;
