import { useHomeThreadQuery } from '@/queries/useThreadQuery';
import { Conversation } from '@/components/Conversation';
import { useCallback, useState } from 'react';
import uuid from 'react-native-uuid';
import { useFocusEffect } from 'expo-router';
import { AnimatedThemedView, ThemedView } from '@/components/ThemedView';
import { ConversationInput } from '@/components/ConversationInput';
import { useSendMessageMutation } from '@/queries/useSendMessageMutation';
import { ThemedText } from '@/components/ThemedText';
import { APP_CONFIG } from '@/appConfig';
import { StyleSheet } from 'react-native';
import { FadeInDown } from 'react-native-reanimated';
import { addNewPersistedPreviousThreads } from '@/utils/persist';

export default function HomeScreen() {
  const [threadId, setThreadId] = useState<string>(uuid.v4());

  useFocusEffect(
    useCallback(() => {
      // Invoked whenever the route is focused.
      setThreadId(uuid.v4());
    }, [])
  );

  const {data} = useHomeThreadQuery(threadId);
  const {mutateAsync, isPending} = useSendMessageMutation(threadId);

  const onSend = useCallback((input: string) => {
    if (!data?.messages) {
      addNewPersistedPreviousThreads(threadId)
    }
    mutateAsync(input);
  }, [mutateAsync, data?.messages, threadId]);


  if (!data?.messages.length) {
    return (
      <ThemedView style={{flex: 1}}>
        <AnimatedThemedView 
          style={styles.textContainer} 
          entering={FadeInDown.springify().stiffness(400).damping(65)}
        >
          <ThemedText type="subtitle">
            {APP_CONFIG.homeMessage}
          </ThemedText>
        </AnimatedThemedView>
        <ConversationInput onSend={onSend} sending={isPending} />
      </ThemedView>
    );
  }

  return (
    <Conversation threadId={threadId} messages={data?.messages ?? []} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});
