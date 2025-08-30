import { Text, useTheme } from "react-native-paper";

export default function DropdownMultiSelect() {
  const theme = useTheme()
  return (
    <Text
      style={{
        backgroundColor: theme.colors.backdrop,
        color: theme.colors.primary
      }}
    >
      Dropdown Multi Select com Search estará aqui
    </Text>
  )
}