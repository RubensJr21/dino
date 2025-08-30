import { Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ButtonProps, Button as RNPButton, useTheme } from "react-native-paper";

type Props = StrictOmit<ButtonProps, "icon"> & { iconName?: keyof typeof Entypo.glyphMap }

export default function Button({ iconName, style, mode, ...props }: Props) {
  const theme = useTheme();
  return (
    <RNPButton
      mode={mode === undefined ? "contained-tonal" : mode}
      icon={(props) => iconName !== undefined && <Entypo name={iconName} {...props}/>}
      style={[
        styles.button,
        { borderRadius: theme.roundness },
        style
      ]}
      rippleColor={theme.colors.onPrimaryContainer}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    
  }
})