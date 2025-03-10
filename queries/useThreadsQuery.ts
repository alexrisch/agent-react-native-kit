import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from './QueryKeys';
import { getPersistedPreviousThreads } from '@/utils/persist';
import { queryClient } from './queryClient';

const getThreadsQueryKey = () => [QueryKeys.threads]

const threadsQueryFunction = async () => {
  const persisted = await getPersistedPreviousThreads();
  return persisted ?? [];
};

const threadsQueryConfig = () => ({
  queryKey: getThreadsQueryKey(),
  queryFn: () => threadsQueryFunction(),
});

export const useThreadsQuery = () => useQuery(threadsQueryConfig())

export const setThreadsQueryCacheData = (threads: string) => {
  const queryKey = threadsQueryConfig().queryKey;

  return queryClient.setQueryData(queryKey, threads);
}
