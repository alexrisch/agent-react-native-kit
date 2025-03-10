import AsyncStorage from "@react-native-async-storage/async-storage";

enum StorageKeys {
  AGENT = 'SAVED_AGENT',
  MODEL = 'SAVED_MODEL',
  PREVIOUS_THREADS = 'PREVIOUS_THREADS_'
}

export const getPersistedAgent = async (): Promise<string | null> => {
  return AsyncStorage.getItem(StorageKeys.AGENT);
};

export const setPersistedAgent = async (agent: string) => {
  return AsyncStorage.setItem(StorageKeys.AGENT, agent)
};

export const getPersistedModel = async (): Promise<string | null> => {
  return AsyncStorage.getItem(StorageKeys.MODEL);
};

export const setPersistedModel = async (model: string) => {
  return AsyncStorage.setItem(StorageKeys.MODEL, model)
};

export const getPersistedPreviousThreads = async (): Promise<string[]> => {
  const json = await AsyncStorage.getItem(StorageKeys.PREVIOUS_THREADS);
  if (!json) {
    return [];
  }
  return JSON.parse(json);
};

export const addNewPersistedPreviousThreads = async (newThreadId: string) => {
  const previous = await getPersistedPreviousThreads();
  previous.unshift(newThreadId);
  await AsyncStorage.setItem(StorageKeys.PREVIOUS_THREADS, JSON.stringify(previous));
};
