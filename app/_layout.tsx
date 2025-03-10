import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContent } from '@/components/DrawerContent';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/queries/queryClient';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Layout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text")
  const screenOptions = useMemo(() => {
    if (colorScheme === 'dark') {
      return {
        headerBackgroundContainerStyle: {
          backgroundColor,
        },
        headerStyle: {
          backgroundColor,
        },
        headerTitleStyle: {
          color: textColor
        },
        headerTintColor: textColor
      }
    } else {
      return {
        headerTintColor: textColor
      }
    }
  }, [backgroundColor, textColor])
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={DrawerContent} screenOptions={screenOptions}>
          <Drawer.Screen
            name="index" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Home',
              title: "",
            }}
          />
          <Drawer.Screen
            name={'thread/[id]'}
            options={{
              title: '',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
