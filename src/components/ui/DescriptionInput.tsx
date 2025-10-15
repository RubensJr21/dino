import { TextInput } from "@components/ui/base/TextInput"

interface Props {
  description: string,
  onChangeDescription: (description: string) => void
}

export function DescriptionInput({ description, onChangeDescription }: Props) {
  return (
    <TextInput
      label="Insira uma descrição:"
      placeholder="Escreva uma descrição..."
      value={description}
      onChangeText={onChangeDescription}
    />
  )
}