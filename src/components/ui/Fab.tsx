import { Entypo } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
import { FAB, FABProps, useTheme } from "react-native-paper"

type Props = StrictOmit<FABProps, "icon"> & { iconName: keyof typeof Entypo.glyphMap }

export const Fab = ({ iconName, style, ...props }: Props) => {
  const theme = useTheme()
  const fabColor = theme.colors.secondaryContainer
  return (
    <FAB
      icon={(props) => iconName !== undefined && <Entypo name={iconName} {...props} />}
      style={[
        styles.fab,
        style,
        { backgroundColor: fabColor }
      ]}
      size="medium"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    // Não é mais necessário pois ele será animado nas telas de home
    // margin: 10,
    right: 0,
    bottom: 0,
  },
})