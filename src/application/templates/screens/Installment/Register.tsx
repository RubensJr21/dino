import InputInstallmentsNumber, { useRefInputInstallmentsNumber } from "@src/application/components/Input/InputInstallmentsNumber";
import { EditInstallmentScreenParams as RegisterParams } from "@src/application/types/screens/InstallmentScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormTemplate, { getVariantText } from "../../FormTemplate";

interface InstallmentRegisterScreenTemplateProps {
  variant: TypeOfVariants
  submitAction: (data: RegisterParams) => void
}

export default function InstallmentRegisterScreenTemplate({ variant, submitAction }: InstallmentRegisterScreenTemplateProps) {
  const labelRecurring = `Informe a quantidade de parcelas do ${getVariantText(variant)}` 
  
  const refInstallmentNumber = useRefInputInstallmentsNumber();

  const handleAction = (standard: EditStandardScreenParams) => {
    const data_recurring = {
      ...standard,
      installments_number: 2
    } satisfies RegisterParams
    submitAction(data_recurring)
  }
  
  return (
    <FormTemplate
      {...{ variant }}
      submitAction={handleAction}
      formExtension={<InputInstallmentsNumber label={labelRecurring} {...{ refInstallmentNumber }} />}
    />
  );
}