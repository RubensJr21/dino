import { TextInput } from "@components/ui/base/TextInput"

interface Props {
  nickname: string,
  onChangeNickname: (nickname: string) => void
}

export function NicknameInput({ nickname, onChangeNickname }: Props) {
  return (
    <TextInput
      label="Insira um apelido para a conta bancária:"
      placeholder="Ex: Conta do banco X..."
      value={nickname}
      onChangeText={onChangeNickname}
    />
  )
}