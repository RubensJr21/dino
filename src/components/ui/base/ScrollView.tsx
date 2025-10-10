import { KeyboardAvoidingView, Platform, ScrollViewProps, StyleSheet } from "react-native"
import { ScrollView as RNScrollView } from "react-native-gesture-handler"

export default function ScrollView({ style, ...props }: ScrollViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={{ flex: 1 }}
    >
      <RNScrollView style={StyleSheet.compose({ flex: 1 }, style)} {...props} />
    </KeyboardAvoidingView>
  )
}