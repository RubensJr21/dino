import { TextInput as RNPTextInput, TextInputProps } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  label: string;
  placeholder?: string;
  inputMode?: TextInputProps["inputMode"]
  style?: TextInputProps["style"]
}

export function TextInput({ value, onChangeText, label, placeholder, inputMode, style }: Props) {
  return (
    <RNPTextInput
      dense
      mode="outlined"
      label={label}
      placeholder={placeholder}
      value={value}
      style={[{ marginVertical: 0 }, style]}
      onChangeText={onChangeText}
      inputMode={inputMode}
    />
  )
}