import { StyleSheet } from "react-native";
import { FAB, FABProps } from "react-native-paper";

export default function Fab(props: FABProps) {
  return (
    <FAB
      {...props}
      style={props.style ? [props.style, styles.fab] : styles.fab}
    />
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});