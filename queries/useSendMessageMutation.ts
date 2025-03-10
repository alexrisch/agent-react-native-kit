import { useMutation } from '@tanstack/react-query'
import { MutationKeys } from "./MutationKeys";
import { ChatMessage } from '@/types';
import axios from 'axios';
import { addMessageToThreadQuery } from './useThreadQuery';
import { APP_CONFIG } from '@/appConfig';
import { getPersistedAgent, getPersistedModel } from '@/utils/persist';

const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const getSendMessageMutationKey = (threadId: string) => [
  MutationKeys.sendMessage,
  threadId,
];

const sendMessageFunction = async (threadId: string, input: string) => {
  const humanMessage: ChatMessage = {
    content: input,
    type: "human",
  };
  const model: string | undefined | null = APP_CONFIG.enableModelSelect ? await getPersistedModel() : undefined;
  const agent: string | undefined | null = APP_CONFIG.enableAgentSelect ? await getPersistedAgent() : undefined;
  addMessageToThreadQuery(threadId, humanMessage);
  const sendRes = await axios.post<ChatMessage, { data: ChatMessage }>(`${apiUrl}/api/invoke`, {
    threadId,
    message: input,
    model,
    agent,
  });
  const { data: newMessage } = sendRes;
  addMessageToThreadQuery(threadId, newMessage);
}

export const useSendMessageMutation = (threadId: string) => useMutation({
  mutationKey: getSendMessageMutationKey(threadId),
  mutationFn: (input: string) => sendMessageFunction(threadId, input),
});
