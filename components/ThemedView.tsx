import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import Animated from 'react-native-reanimated';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = React.forwardRef<View, ThemedViewProps>(
  ({ style, lightColor, darkColor, ...otherProps }, ref) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return <View ref={ref} style={[{ backgroundColor }, style]} {...otherProps} />;
  }
);

export const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);

ThemedView.displayName = 'ThemedView';
