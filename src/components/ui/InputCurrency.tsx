import { Text, useTheme } from "react-native-paper";

export default function InputCurrency() {
  const theme = useTheme()
  return (
    <Text
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.onPrimaryContainer 
      }}
    >
      Input Currency aqui
    </Text>
  )
}