import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from './QueryKeys';
import { getPersistedAgent } from '@/utils/persist';
import { queryClient } from './queryClient';

const getAgentQueryKey = () => [QueryKeys.agent]

const agentQueryFunction = async () => {
  return getPersistedAgent();
};

const agentQueryConfig = () => ({
  queryKey: getAgentQueryKey(),
  queryFn: () => agentQueryFunction(),
});

export const useAgentQuery = () => useQuery(agentQueryConfig())

export const setAgentQueryCacheData = (agent: string) => {
  const queryKey = agentQueryConfig().queryKey;

  return queryClient.setQueryData(queryKey, agent);
}
