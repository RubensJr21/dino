import { Button, ButtonProps } from "react-native-paper";
import { Entypo, IconNames } from "./Icons.lib";

interface SubmitButtonProps {
  variant: 'Add' | 'Edit'
  onPress: () => void;
  style?: ButtonProps["style"]
}

type ConfigButton = ['Registrar'|'Editar', IconNames<typeof Entypo>]

function getConfig(variant: SubmitButtonProps["variant"]): ConfigButton {
  switch (variant) {
    case 'Add':
      return ['Registrar', "squared-plus"]
    case 'Edit':
      return ['Editar', "edit"]
    default:
      return ['Registrar', "squared-plus"]
  }
}

export const SubmitButton = ({ variant, onPress, style }: SubmitButtonProps) => {
  const [label, icon] = getConfig(variant)
  return (
    <Button
      mode="contained"
      icon={icon}
      contentStyle={{ flexDirection: "row-reverse" }}
      onPress={onPress}
      style={style}
    >
      {label}
    </Button>
  );
};