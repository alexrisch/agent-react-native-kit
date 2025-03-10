import { PlatformPressable, } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { ComponentProps, FC, useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';

type HapticButtonProps = ComponentProps<typeof PlatformPressable>;

export const HapticButton: FC<HapticButtonProps> = (props) => {

  const hapticOnPressIn = useCallback((ev: GestureResponderEvent) => {
    if (process.env.EXPO_OS === 'ios') {
      // Add a soft haptic feedback when pressing down on the tabs.
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    props.onPressIn?.(ev);
  }, [props.onPressIn]);

  return (
    <PlatformPressable {...props} onPressIn={hapticOnPressIn} />
  );
};
