import InputDescription, { InputDescriptionProps } from "@src/application/components/Input/InputDescription";

type Props = StrictOmit<InputDescriptionProps, "placeholder">;

export default function InputDescriptionReceipt({ refDescription }: Props){
  return (
    <InputDescription
      placeholder="De onde veio esse valor?"
      refDescription={refDescription}
    />
  )
}