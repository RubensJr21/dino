import Button from "@components/ui/Button";
import { Entypo, IconNames } from "@lib/icons.lib";
import { ButtonProps } from "react-native-paper";

type Props = StrictOmit<ButtonProps, "icon"> & {
  variant: 'Add' | 'Edit';
  onPress: () => void;
}

type ConfigButton = ['Registrar' | 'Editar', IconNames<typeof Entypo>]

function getConfig(variant: Props["variant"]): ConfigButton {
  switch (variant) {
    case 'Add':
      return ['Registrar', "squared-plus"]
    case 'Edit':
      return ['Editar', "edit"]
    default:
      return ['Registrar', "squared-plus"]
  }
}

export const SubmitButton = ({ variant, onPress, style }: Props) => {
  const [label, icon] = getConfig(variant)
  return (
    <Button
      iconName={icon}
      contentStyle={{ flexDirection: "row-reverse" }}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};