import { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, PanResponderInstance } from 'react-native';

export const useVerticalPanSnapper = (snapOffsets: number[], initialSnapIndex: number, onSnap?: (snapIndex: number) => void, handleOffset?: number):
  [ PanResponderInstance, Animated.Value, (snapIndex: number) => void ] =>
{
  const panYRef = useRef(new Animated.Value(snapOffsets[initialSnapIndex]));
  const [ position, setPosition ] = useState(snapOffsets[initialSnapIndex]);
  const [ snapIndex, setSnapIndex ] = useState(-1);
  const [ velocity, setVelocity ] = useState(-1);

  useEffect(() =>
  {
    if (velocity === -1)
    {
      return;
    }

    const swipe = Math.abs(velocity) > 1;

    let nearestSnapIndex: number | undefined;
    let nearestSnapDistance: number | undefined;
    for (let index = 0; index < snapOffsets.length; index++)
    {
      const toSnapOffset = snapOffsets[index] - position;
      if (swipe && Math.sign(toSnapOffset) !== Math.sign(velocity))
      {
        continue;
      }

      const toCurrentSnapDistance = Math.abs(toSnapOffset);
      if (nearestSnapDistance === undefined || toCurrentSnapDistance < nearestSnapDistance)
      {
        nearestSnapIndex = index;
        nearestSnapDistance = toCurrentSnapDistance;
      }
    }

    if (nearestSnapIndex === undefined)
    {
      const nearestSnapOffset = snapOffsets.reduce((previousValue, currentValue) =>
      {
        if (Math.sign(velocity) === 1)
        {
          return currentValue > previousValue ? currentValue : previousValue;
        }
        else
        {
          return currentValue < previousValue ? currentValue : previousValue;
        }
      });

      nearestSnapIndex = snapOffsets.indexOf(nearestSnapOffset);
    }

    setSnapIndex(nearestSnapIndex);
    setVelocity(-1);
  }, [ position, snapOffsets, velocity ]);

  useEffect(() =>
  {
    if (snapIndex === -1)
    {
      return;
    }

    Animated.spring(
      panYRef.current,
      {
        toValue: snapOffsets[snapIndex],
        useNativeDriver: false
      }
    ).start();

    onSnap?.(snapIndex);
    setSnapIndex(-1);
  }, [ onSnap, snapIndex, snapOffsets ]);

  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) >= 10,
      onStartShouldSetPanResponderCapture: (_, gestureState) => Math.abs(gestureState.dy) >= 10,
      onPanResponderMove: (_, gestureState) => panYRef.current.setValue(gestureState.moveY + (handleOffset ?? 0)),
      onPanResponderRelease: (_, gestureState) =>
      {
        setPosition(gestureState.moveY);
        setVelocity(gestureState.vy);
      }
    })
  );

  return [ panResponderRef.current, panYRef.current, setSnapIndex ];
};
