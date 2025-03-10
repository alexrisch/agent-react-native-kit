import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { AnimatedThemedView, ThemedView } from "./ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import * as Haptics from 'expo-haptics';
import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FadeInUp, SlideInDown, SlideInUp } from "react-native-reanimated";

type ConversationInputProps = {
  onSend: (text: string) => void;
  sending: boolean;
}

export function ConversationInput({
  onSend,
  sending
}: ConversationInputProps) {
  const { bottom } = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const inputRef = useRef<TextInput>(null);
  const textColor = useThemeColor({}, 'text');

  const handleSend = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onSend(input);
    inputRef.current?.clear();
  }, [input]);

  const disabled = !input || sending;

  return (
    <AnimatedThemedView
      style={[{
        marginBottom: bottom,
        borderColor: textColor,
      }, 
        styles.container
      ]}
      entering={SlideInDown.stiffness(400).damping(650).duration(1000)}
    >
      <TextInput
        ref={inputRef}
        onChangeText={setInput}
        defaultValue={input}
        style={{
          height: 50,
          flex: 1,
          color: textColor,
        }}
        placeholder="Send a message"
        onSubmitEditing={handleSend}
      />
      <Pressable disabled={disabled} onPress={handleSend}>
        <MaterialIcons name="send" size={24} color={disabled ? '#E5E7EB' : textColor} />
      </Pressable>
    </AnimatedThemedView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    textAlignVertical: 'center',
    lineHeight: 32,
  },
  container: {
    borderWidth: 1,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 4,
  }
});
