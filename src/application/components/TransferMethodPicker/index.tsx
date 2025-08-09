import { useRef } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { BankPicker } from "./BankPicker";
import { TransferMethodOfBankPicker } from "./TransferMethodOfBankPicker";

export interface TransferMethodPickerTypeRef {
  value: React.MutableRefObject<string>;
  changeType: (text: string) => void;
}

export function useRefTagPicker(initialValue: string): TransferMethodPickerTypeRef {
  const ref = useRef<string>(initialValue);
  const changeType = (text: string) => ref.current = text;
  return {
    value: ref,
    changeType,
  };
}

export function TransferMethodPicker() {
  const theme = useTheme();
  // TODO: Preciso informar para onde está saindo aquele valor
  // TransferMethodPicker
  // 1. Precisa selecionar de qual banco vai transferir
  // 1.1 O sistema vai buscar os métodos de transferência disponíveis daquela conta
  // 2. Precisa selecionar o método de transferência

  // <BankPicker />
  // Obs: Se nenhum banco estiver ativado exibir um aviso:
  //   "Nenhuma conta bancária está ativa no momento. Ative ou registre alguma conta bancária."
  // <TransferMethodOfBankPicker />
  // Obs: Se nenhuma método de transferência do banco escolhido estiver ativado exibir:
  //   "Nenhum tipo de transferência conta bancária está ativa no momento. Ative algum tipo de método da conta selecionada."
  return (
    <View
      style={{
        borderWidth: 5,
        borderColor: theme.colors.inverseOnSurface,
        padding: 10,
        gap: 10
      }}
    >
      <Text
        style={{
          textAlign: "center",
          textAlignVertical: "center"
        }}
        variant="titleMedium"
        children={"Selecionar meio de {Pagamento}"}
      />
      <BankPicker />
      <TransferMethodOfBankPicker />
    </View>
  )
}