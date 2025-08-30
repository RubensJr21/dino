import Button from "@components/ui/Button";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ButtonProps } from "react-native-paper";

type Props = StrictOmit<ButtonProps, "icon" | "children"> & { iconName?: keyof typeof Entypo.glyphMap }

export default function ButtonIcon({ contentStyle, style, ...props }: Props) {
  return (
    <Button
      contentStyle={[contentStyle, styles.buttonIconContent]}
      style={[
        style,
        {
          // flexDirection: "column",
          // alignSelf: "flex-start",
          // width: "auto",
          justifyContent: "center",
          margin: 0,
          padding: 0
        }
      ]}
      {...props}
      children={undefined}
    />
  )
}

const styles = StyleSheet.create({
  buttonIconContent: {
    justifyContent: "center",
    backgroundColor: "red",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center"
  }
})