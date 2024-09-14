import { FC, useContext, useState } from 'react';
import { ModalProps, View } from 'react-native';

import { beforeDate, today } from 'apps-core';
import { Button, DateInput, Emoji, Modal, styles, Text, updateDocument } from 'apps-mobile';
import { addStop, Stop as StopType, User } from 'vaga-core';

import { CurrentUserContext } from '../common/current-user';
import AddressInput from './AddressInput';

interface Props extends ModalProps
{
  stop: StopType;
  add?: boolean;
  onSave?: (index: number) => void;
}

const Stop: FC<Props> = ({ stop, add, onSave, ...modalProps }) =>
{
  const { currentUser } = useContext(CurrentUserContext);
  const [ internalValue, setInternalValue ] = useState({ ...stop });

  const save = async () =>
  {
    const updatedTimeline = [ ...currentUser.timeline ];

    if (!add)
    {
      updatedTimeline.splice(updatedTimeline.indexOf(stop), 1);
    }

    addStop(updatedTimeline, internalValue);
    await updateDocument<User>('users', currentUser.id, { timeline: updatedTimeline });

    return updatedTimeline.indexOf(internalValue);
  };

  return (
    <Modal
      transparent
      {...modalProps}
    >
      <Text size="large" style={styles.marginBottom}>{add ? 'Add' : 'Edit'} stop</Text>
      <AddressInput
        style={styles.marginBottom}
        value={internalValue.address}
        onChange={value =>
        {
          setInternalValue({ ...internalValue, address: value });
        }}
      />
      <DateInput
        style={styles.marginBottom}
        value={[ internalValue.arrivedAt ]}
        onChange={value =>
        {
          setInternalValue({ ...internalValue, arrivedAt: value[0], confidence: beforeDate(value[0], today()) ? 1 : internalValue.confidence });
        }}
      />
      {!beforeDate(internalValue.arrivedAt, today()) &&
        <View style={styles.marginBottom}>
          <Text size="small" style={styles.marginBottomSmall}>How confident are you about this plan?</Text>
          <View style={styles.row}>
            <Button
              shade={internalValue.confidence === 1 ? 'front' : undefined}
              circle
              style={styles.marginRight}
              onPress={() => setInternalValue({ ...internalValue, confidence: 1 })}
            >
              <Emoji name="slightly_smiling_face" />
            </Button>
            <Button
              shade={internalValue.confidence === 0.5 ? 'front' : undefined}
              circle
              style={styles.marginRight}
              onPress={() => setInternalValue({ ...internalValue, confidence: 0.5 })}
            >
              <Emoji name="thinking_face" />
            </Button>
            <Button
              shade={internalValue.confidence === 0 ? 'front' : undefined}
              circle
              style={styles.marginRight}
              onPress={() => setInternalValue({ ...internalValue, confidence: 0 })}
            >
              <Emoji name="lying_face" />
            </Button>
          </View>
        </View>
      }
      <View style={styles.rowEnd}>
        <Button
          shade="accent"
          onPress={async event =>
          {
            const newIndex = await save();
            onSave?.(newIndex);
            modalProps.onRequestClose?.(event);
          }}
        >
          <Text>Save</Text>
        </Button>
      </View>
    </Modal>
  );
};

export default Stop;
