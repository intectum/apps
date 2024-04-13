import { FC } from 'react';

import { Emoji } from 'apps-mobile';
import { User } from 'vaga-core';

interface Props
{
  user: User;
  stopIndex: number;
}

const StopConfidence: FC<Props> = ({ user, stopIndex }) =>
{
  const stop = user.timeline[stopIndex];

  const confidenceEmojiMap: Record<number, string> =
  {
    0: 'lying_face',
    0.5: 'thinking_face',
    1: 'slightly_smiling_face'
  };

  return <Emoji name={confidenceEmojiMap[stop.confidence ?? -1] ?? 'shrug'} />;
};

export default StopConfidence;
