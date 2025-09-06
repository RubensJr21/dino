import { Entypo, IconNames } from "@lib/icons.lib";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

type GetIconNames<U> = U extends IconNames<typeof Entypo> ? U : never

interface ButtonStepperProps {
  iconName: GetIconNames<"plus" | "minus">;
  onPress: () => void
}

export function ButtonStepper({ iconName, onPress }: ButtonStepperProps) {
  const theme = useTheme()

  // Padrões extraídos da lib 'react-native-paper':
  // disabled: theme.colors.surfaceDisabled
  // elevated: theme.colors.elevation.level1;
  // contained: theme.colors.primary;
  // contained-tonal: theme.colors.secondaryContainer;
  const buttonColor = theme.colors.secondaryContainer

  // disable: theme.colors.onSurfaceDisabled;
  // type dark is boolean & (contained | contained - tonal | elevated)
  // ↳  dark:'#ffffff'
  // ↳  light: '#000000'
  // outlined | text | elevated: theme.colors.primary
  // contained: theme.colors.onPrimary
  // contained - tonal: theme.colors.onSecondaryContainer
  const iconColor = theme.colors.onSecondaryContainer
  return (
    <TouchableOpacity
      style={{
        backgroundColor: buttonColor,
        aspectRatio: 1,
        borderRadius: theme.roundness
      }}
      onPress={onPress}
    >
      <Entypo style={{ textAlign: "center", textAlignVertical: "center", aspectRatio: 1 }} name={iconName} size={25} color={iconColor} />
    </TouchableOpacity>
  )
}