import InputDescription, { InputDescriptionProps } from "@src/application/components/Input/InputDescription";

type Props = StrictOmit<InputDescriptionProps, "placeholder">;

export default function InputDescriptionPayment({ refDescription }: Props){
  return (
    <InputDescription
      placeholder="Para onde vai esse valor?"
      refDescription={refDescription}
    />
  )
}