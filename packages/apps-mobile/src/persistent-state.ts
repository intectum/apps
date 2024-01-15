import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function usePersistentState<T>(name: string): [ T | undefined, (value: T | undefined) => void ];
export function usePersistentState<T>(name: string, initialValue: T): [ T, (value: T) => void ];
export function usePersistentState<T>(name: string, initialValue?: T)
{
  const [ state, setState ] = useState<T>();

  useEffect(() =>
  {
    if (state)
    {
      return;
    }

    AsyncStorage.getItem(name).then(item =>
    {
      if (item !== null)
      {
        setState(JSON.parse(item));
      }
      else if (typeof initialValue !== 'undefined')
      {
        setState(initialValue);
      }
    });
  }, [ initialValue, name, state ]);

  const setPersistentState = async (value: T | undefined) =>
  {
    await AsyncStorage.setItem(name, JSON.stringify(value));
    setState(value);
  };

  return [ state, setPersistentState ];
}
