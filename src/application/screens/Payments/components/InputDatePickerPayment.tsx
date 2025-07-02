import InputDatePicker, { InputDatePickerProps } from "@src/application/components/Input/InputDatePicker";

type Props = StrictOmit<InputDatePickerProps, "label">;

export default function InputDatePickerPayment({ refDatePicker }: Props){
  return (
    <InputDatePicker
      label="Selecione a data do pagamento:"
      refDatePicker={refDatePicker}
      />
  )
}