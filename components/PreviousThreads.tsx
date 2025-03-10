import { useThreadsQuery } from "@/queries/useThreadsQuery";
import { ThemedText } from "./ThemedText"
import { ThemedView } from "./ThemedView"
import { useDrawerStatus } from "@react-navigation/drawer";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";


export function PreviousThreads() {
  const { data: previousThreads = [], refetch } = useThreadsQuery();
  const isDrawerOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    if (isDrawerOpen) {
      refetch();
    }
  }, [isDrawerOpen])

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Previous Threads
      </ThemedText>
      {previousThreads.map(thread => {
        return (
          <Link
            key={thread}
            href={{
              pathname: '/thread/[id]',
              params: { id: thread },
            }}>
            <ThemedView style={styles.itemContainer}>
              <ThemedText numberOfLines={1}>
                {thread}
              </ThemedText>
            </ThemedView>
          </Link>
        )
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 4,
  },
  container: {
    marginTop: 24
  },
  title: {
    paddingBottom: 8
  },
});
