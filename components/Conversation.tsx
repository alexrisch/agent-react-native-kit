import { StyleSheet, FlatList, ListRenderItem } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ChatMessage } from '@/types';
import { ConversationInput } from '@/components/ConversationInput';
import { useSendMessageMutation } from '@/queries/useSendMessageMutation';
import { useEffect, useRef } from 'react';

type ConversationProps = {
  threadId: string;
  messages: ChatMessage[];
}

export function Conversation({ threadId, messages }: ConversationProps) {
  const renderItem: ListRenderItem<ChatMessage> = ({
    item
  }) => {
    const fromHuman = item.type === 'human';
    return (
      <ThemedView style={[styles.message, fromHuman ? styles.humanMessage : styles.aiMessage]}>
        <ThemedText style={fromHuman ? styles.humanMessageText : styles.aiMessageText}>
          {item.content}
        </ThemedText>
      </ThemedView>
    );
  };

  const flatListRef = useRef<FlatList>(null);

  const { mutateAsync, isPending } = useSendMessageMutation(threadId);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 50)
  }, [messages?.length])

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={{flex: 1, paddingHorizontal: 8}}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
        />
      </ThemedView>
      <ConversationInput onSend={mutateAsync} sending={isPending} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  aiMessage: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: 'black',
    maxWidth: '80%',
    backgroundColor: '#E5E7EB',
  },
  aiMessageText: {
    color: 'black'
  },
  humanMessage: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  humanMessageText: {
    color: 'white',
  },
  message: {
    margin: 8,
    padding: 8,
    borderRadius: 8,
  },
  input: {

  }
});
