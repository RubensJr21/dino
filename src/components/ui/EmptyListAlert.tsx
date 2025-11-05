import { IconNames, MCIcons } from "@lib/icons.lib";
import { Text, useTheme } from "react-native-paper";

interface EmptyListAlertProps {
  iconName: IconNames<typeof MCIcons>;
  message: string;
}

export function EmptyListAlert({ iconName, message }: EmptyListAlertProps) {
  const theme = useTheme()
  return (
    <>
      <MCIcons
        style={{ textAlign: "center" }}
        name={iconName}
        color={theme.colors.primary}
        size={245}
      />
      <Text style={{ textAlign: "center" }}>{message}</Text>
    </>
  )
}