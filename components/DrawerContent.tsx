import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Link } from 'expo-router';
import { ThemedView } from './ThemedView';
import { RadioButtonGroup } from './RadioButtonGroup';
import { useCallback } from 'react';
import { useInfoQuery } from '@/queries/useInfoQuery';
import { setModelQueryCacheData, useModelQuery } from '@/queries/usePersistedModelQuery';
import { setAgentQueryCacheData, useAgentQuery } from '@/queries/usePersistedAgentQuery';
import { APP_CONFIG } from '@/appConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PreviousThreads } from './PreviousThreads';

export const DrawerContent = (props: any) => {
  const { data } = useInfoQuery();
  const { data: selectedAgent } = useAgentQuery();
  const { data: selectedModel } = useModelQuery();

  const textColor = useThemeColor({}, 'text');

  const onAgentSelect = useCallback((agent: string) => () => {
    setAgentQueryCacheData(agent)
  }, [])

  const onModelSelect = useCallback((model: string) => () => {
    setModelQueryCacheData(model)
  }, [])

  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 8 }}>
      <DrawerContentScrollView {...props}>
        <Link href={{
          pathname: '/',
        }}>
          <MaterialIcons name="home" size={24} color={textColor} />
        </Link>
        {APP_CONFIG.enableAgentSelect && <RadioButtonGroup
          title='Agent'
          options={data?.agents?.map(agent => ({
            label: agent.key,
            id: agent.key,
            onPress: onAgentSelect(agent.key),
            selected: selectedAgent ? selectedAgent === agent.key : data.default_agent === agent.key
          })) ?? []}
        />}
        {APP_CONFIG.enableModelSelect && <RadioButtonGroup
          title='Model'
          options={data?.models?.map(model => ({
            label: model,
            id: model,
            onPress: onModelSelect(model),
            selected: selectedModel ? selectedModel === model : data.default_model === model
          })) ?? []}
        />}
        <PreviousThreads />
      </DrawerContentScrollView>
    </ThemedView>
  );
}


