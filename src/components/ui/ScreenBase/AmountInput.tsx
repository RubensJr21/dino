
import { formatCurrencyString } from "@utils/formatCurrencyString";
import { useCallback } from "react";
import { TextInput } from "react-native-paper";


interface Props {
  amountValue: string;
  onChangeAmount: (amountText: string) => void;
}

export function AmountInput({ amountValue, onChangeAmount }: Props) {
  const handleTextCurrencyInput = useCallback((value: string) => {
    const valueFormatted = formatCurrencyString(value)

    onChangeAmount(valueFormatted)
  }, [onChangeAmount])
  
  return (
    <TextInput
      dense
      label="Valor"
      mode="outlined"
      placeholder="Valor"
      keyboardType="numeric"
      value={amountValue}
      style={{ marginVertical: 0, writingDirection: "rtl" }}
      onChangeText={handleTextCurrencyInput}
      inputMode="numeric"
      maxLength={21}
    />
  )
}