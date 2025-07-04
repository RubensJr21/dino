import { Button } from "react-native-paper";
import { MdiNamesIcon } from "./ChooseIcon";

interface SubmitButtonProps {
  variant: 'Add' | 'Edit'
  onPress: () => void;
}

type ConfigButton = ['Registrar'|'Editar', MdiNamesIcon]

function getConfig(variant: SubmitButtonProps["variant"]): ConfigButton {
  switch (variant) {
    case 'Add':
      return ['Registrar', "plus-box"]
    case 'Edit':
      return ['Editar', "pencil"]
    default:
      return ['Registrar', "plus-box"]
  }
}

export const SubmitButton = ({ variant, onPress }: SubmitButtonProps) => {
  const [label, icon] = getConfig(variant)
  return (
    <Button
      mode="contained"
      icon={icon}
      contentStyle={{ flexDirection: "row-reverse" }}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};