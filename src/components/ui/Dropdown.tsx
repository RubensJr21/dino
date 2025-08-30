import { ReactNode } from "react";
import { Text, useTheme } from "react-native-paper";

export default function Dropdown({ children }: { children?: ReactNode }) {
  const theme = useTheme()
  return (
    <Text
      style={{
        backgroundColor: theme.colors.backdrop,
        color: theme.colors.primary,
        lineHeight: theme.fonts.headlineLarge.lineHeight,
        paddingStart: 25
      }}
    >
      {children ?? "Dropdown estará aqui"}
    </Text>
  )
}