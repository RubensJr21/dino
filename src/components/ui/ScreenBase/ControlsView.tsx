import { StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export function ControlsView({ children }: Props) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  }
})