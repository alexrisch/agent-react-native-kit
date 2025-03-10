import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from './QueryKeys';
import { getPersistedModel } from '@/utils/persist';
import { queryClient } from './queryClient';

const getModelQueryKey = () => [QueryKeys.model]

const modelQueryFunction = async () => {
  return getPersistedModel();
};

const modelQueryConfig = () => ({
  queryKey: getModelQueryKey(),
  queryFn: () => modelQueryFunction(),
});

export const useModelQuery = () => useQuery(modelQueryConfig())

export const setModelQueryCacheData = (model: string) => {
  const queryKey = modelQueryConfig().queryKey;

  return queryClient.setQueryData(queryKey, model);
}
