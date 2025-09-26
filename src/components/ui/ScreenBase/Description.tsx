import { TextInput } from "react-native-paper"

interface Props {
  description: string,
  onChangeText: (description: string) => void
}

export function DescriptionInput({ description, onChangeText }: Props) {
  return (
    <TextInput
      dense
      label="Insira uma descrição:"
      mode="outlined"
      placeholder="Escreva uma descrição..."
      value={description}
      style={{ marginVertical: 0 }}
      onChangeText={onChangeText}
    />
  )
}