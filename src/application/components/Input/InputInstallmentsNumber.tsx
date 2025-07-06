import { useRef } from "react";

export interface InputInstallmentsNumberTypeRef {
  installments_number: React.MutableRefObject<number>;
  changeType: (text: number) => void;
}

export function useRefInputInstallmentsNumber(initialValue: number = 0): InputInstallmentsNumberTypeRef {
  const ref = useRef<number>(initialValue);
  const changeType = (text: number) => ref.current = text;
  return {
    installments_number: ref,
    changeType,
  };
}

interface InputInstallmentsNumberProps {
  label: string;
  refInstallmentNumber: InputInstallmentsNumberTypeRef;
}

// TODO: Criar elemento de selecionar quantidade de parcelas. Elemento simples que permite digitar o número ou pressionar botão de mais e menos
export default function InputInstallmentsNumber({}: InputInstallmentsNumberProps) {
  return (
    <>
    </>
  )
}