
import { useCallback } from "react";
import { TextInput } from "react-native-paper";

interface Props {
  amountValue: string;
  onChangeAmount: (amountText: string) => void;
  label?: string;
  placeholder?: string
}

export function formatCurrencyString(value: string) {
  const onlyNumbers = Number(value.replaceAll(/\D/g, "")) / 100

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(onlyNumbers);
}

export function amountParseToNumber(amountString: string) {
  return Number(amountString.replaceAll(/\D/g, ""))
}

export function amountParseToString(amountNumber: number) {
  return formatCurrencyString(amountNumber.toString())
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