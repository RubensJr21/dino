import InputCurrency, { InputCurrencyProps } from "@src/application/components/Input/Currency/InputCurrency";

type Props = StrictOmit<InputCurrencyProps, "label">;

export default function InputCurrencyPayment({ refCurrency }: Props){
  return (
    <InputCurrency
      label="Valor do Pagamento:"
      refCurrency={refCurrency}
      />
  )
}