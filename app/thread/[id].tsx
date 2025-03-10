import { useLocalSearchParams } from 'expo-router';
import { useThreadQuery } from '@/queries/useThreadQuery';
import { Conversation } from '@/components/Conversation';

export default function ThreadScreen() {
  const { id: threadId } = useLocalSearchParams();
  if (typeof threadId !== 'string') {
    throw new Error('Missing Thread Id');
  }

  const {data} = useThreadQuery(threadId);

  return (
    <Conversation threadId={threadId} messages={data?.messages ?? []} />
  );
}
