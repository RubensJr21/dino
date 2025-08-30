import { Text, useTheme } from "react-native-paper";

export default function DropdownWithSearch() {
  const theme = useTheme()
  return (
    <Text
      style={{
        backgroundColor: theme.colors.backdrop,
        color: theme.colors.primary
      }}
    >
      Dropdown com Search estará aqui
    </Text>
  )
}