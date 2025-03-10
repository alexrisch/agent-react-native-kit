import { Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { useCallback } from "react";
import * as Haptics from 'expo-haptics';

export type ThemedRadioButtonProps = {
  id: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const SIZE = 20;

export function ThemedRadioButton(props: ThemedRadioButtonProps) {
  const { label, selected, onPress } = props;
  const textColor = useThemeColor({}, "text");

  const handlePressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }, [])

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.text}>
          {label}
        </ThemedText>
        {selected ? (
          <View
            style={[styles.outerSelected, {
              borderColor: textColor,
            }]}
          >
            <View style={[
              styles.innerSelected,
              {
                backgroundColor: textColor
              }
            ]} />
          </View>
        ) : (
          <View
            style={[
              styles.button,
              styles.unselected,
              {
                borderColor: textColor
              }
            ]}
          />
        )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {

  },
  button: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE
  },
  outerSelected: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerSelected: {
    height: SIZE - 5,
    width: SIZE - 5,
    borderRadius: SIZE - 5,
  },
  unselected: {
    borderWidth: 1,
  },
})
