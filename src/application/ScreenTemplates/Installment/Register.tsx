import { EditInstallmentScreenParams as RegisterParams } from "@src/application/types/screens/InstallmentScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import FormRegisterTemplate from "../Form/FormRegisterTemplate";

interface InstallmentRegisterScreenTemplateProps {
  variant: 'receipt' | 'payment'
  submitAction: (data: RegisterParams) => void
}

export default function InstallmentRegisterScreenTemplate({ variant, submitAction }: InstallmentRegisterScreenTemplateProps) {
  const handleAction = (standard: EditStandardScreenParams) => {
    const data_recurring = {
      ...standard,
    } satisfies RegisterParams
    submitAction(data_recurring)
  }
  
  return (
    <FormRegisterTemplate
      {...{ variant }}
      submitAction={handleAction}
      formExtension={
        // TODO: Criar elemento de selecionar quantidade de parcelas. Elemento simples que permite digitar o número ou pressionar botão de mais e menos
        // <InputInstallmentsNumber />
        undefined
      }
    />
  );
}