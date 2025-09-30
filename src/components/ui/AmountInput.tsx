
import { formatCurrencyString } from "@utils/formatCurrencyString";
import { useCallback } from "react";
import { TextInput } from "react-native-paper";

interface Props {
  amountValue: string;
  onChangeAmount: (amountText: string) => void;
  label?: string;
  placeholder?: string
}

export function amountParse(amountString: string) {
  return Number(amountString.replaceAll(/\D/g, ""))
}

export function AmountInput({ amountValue, onChangeAmount, label = "Valor", placeholder = "Digite um valor..." }: Props) {
  const handleTextCurrencyInput = useCallback((value: string) => {
    const valueFormatted = formatCurrencyString(value)

    onChangeAmount(valueFormatted)
  }, [onChangeAmount])
  
  return (
    <TextInput
      dense
      label={label}
      mode="outlined"
      placeholder={placeholder}
      keyboardType="numeric"
      value={amountValue}
      style={{ marginVertical: 0, writingDirection: "rtl" }}
      onChangeText={handleTextCurrencyInput}
      inputMode="numeric"
      maxLength={21}
    />
  )
}