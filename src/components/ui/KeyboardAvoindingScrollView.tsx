import { KeyboardAvoidingView, ScrollViewProps } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

type KeyboardAvoidingScrollViewProps = ScrollViewProps

export default function KeyboardAvoidingScrollView({...props}: KeyboardAvoidingScrollViewProps) {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView {...props} />
    </KeyboardAvoidingView>
  )
}