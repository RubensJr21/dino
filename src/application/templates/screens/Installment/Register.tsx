import { EditInstallmentScreenParams as RegisterParams } from "@src/application/types/screens/InstallmentScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormTemplate from "../../FormTemplate";

interface InstallmentRegisterScreenTemplateProps {
  variant: TypeOfVariants
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
    <FormTemplate
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