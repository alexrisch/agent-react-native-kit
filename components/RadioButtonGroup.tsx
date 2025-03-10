import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ThemedRadioButton, ThemedRadioButtonProps } from "./ui/ThemedRadioButton"

type RadioButtonGroupProps = {
  title: string;
  options: ThemedRadioButtonProps[];
}

export function RadioButtonGroup({ options, title }: RadioButtonGroupProps) {

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedView>
        {options.map(option => {
          return (
            <ThemedView key={option.id} style={styles.itemContainer}>
              <ThemedRadioButton
                {...option}
              />
            </ThemedView>
          )
        })}
      </ThemedView>
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 4,
  },
  container: {
    marginTop: 24
  },
  title: {
    paddingBottom: 8
  },
});
