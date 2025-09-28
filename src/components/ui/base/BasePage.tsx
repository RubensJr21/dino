import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps

export default function BasePage({ style, ...props }: Props) {
  return (
    <View
      style={[
        styles.basePage,
        style
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  basePage: {
    flex: 1,
    padding: 16,
  }
})