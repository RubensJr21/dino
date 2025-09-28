import { TextInput as RNPTextInput } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  label: string;
  placeholder?: string;
}

export function TextInput({ value, onChangeText, label, placeholder }: Props) {
  return (
    <RNPTextInput
      dense
      mode="outlined"
      label={label}
      placeholder={placeholder}
      value={value}
      style={{ marginVertical: 0 }}
      onChangeText={onChangeText}
    />
  )
}