import { FC, useEffect, useRef, useState } from 'react';
import { FlatList, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import {
  Button,
  fontSizes,
  Icon,
  Modal,
  Pressable,
  Size,
  styles,
  Text,
  TextInput,
  Themeable,
  useThemes
} from 'apps-mobile';
import { Address, autocomplete, formatAddress, geocode, PlacesAutocompletePrediction } from 'madfam-core';

interface Props extends Themeable
{
  size?: Size;
  value?: Address;
  onChange?: (value: Address) => void;
  style?: StyleProp<ViewStyle>;
}

const AddressInput: FC<Props> = ({ theme, shade, size, value, onChange, style: propStyle }) =>
{
  const ref = useRef<View>(null);
  const [ results, setResults ] = useState<PlacesAutocompletePrediction[]>();
  const [ search, setSearch ] = useState('');
  const [ showSearch, setShowSearch ] = useState(false);

  const themes = useThemes(theme);

  useEffect(() =>
  {
    if (!search.length)
    {
      setResults(undefined);
      return;
    }

    const abortController = new AbortController();
    autocomplete(search, abortController.signal).then(theResults =>
    {
      if (!abortController.signal.aborted)
      {
        setResults(theResults);
      }
    });

    return () => abortController.abort();
  }, [ search ]);

  const style: ViewStyle =
  {
    ...styles.rounded,
    overflow: 'hidden',
    backgroundColor: `${themes.monochrome.back}88`
  };

  const pressableStyle: TextStyle =
  {
    ...styles.row,
    ...styles.paddingShort
  };

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  return (
    <>
      <View ref={ref} style={{ ...style, ...viewStyle }}>
        <Pressable style={pressableStyle} onPress={() => setShowSearch(true)}>
          <Icon icon="location-pin" style={styles.marginRightSmall} />
          <Text shade={shade} size={size} numberOfLines={1}>{formatAddress(value)}</Text>
        </Pressable>
      </View>
      <Modal
        visible={showSearch}
        onRequestClose={() => setShowSearch(false)}
      >
        <View style={styles.rowEnd}>
          <Button circle onPress={() => setShowSearch(false)}>
            <Icon icon="x" size={fontSizes.medium} />
          </Button>
        </View>
        <TextInput
          autoFocus
          inputMode="search"
          enterKeyHint="search"
          prefix={<Icon icon="magnifying-glass" style={styles.marginRightSmall} />}
          placeholder="e.g. London or England or UK"
          style={styles.marginShort}
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={results}
          keyExtractor={item => item.description}
          renderItem={({ item }) =>
            <Pressable
              style={styles.paddingShort}
              onPress={async () =>
              {
                const address = await geocode(item.description);
                setShowSearch(false);
                if (address)
                {
                  onChange?.(address);
                }
              }}>
              <Text>{item.description}</Text>
            </Pressable>
          }
        />
      </Modal>
    </>
  );
};

export default AddressInput;
