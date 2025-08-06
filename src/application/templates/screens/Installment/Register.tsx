import InputInstallmentsNumber, { useRefInputInstallmentsNumber } from "@src/application/components/Input/InputInstallmentsNumber";
import { IInstallment } from "@src/core/entities/installment.entity";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormTemplate, { getVariantText, ValueFormTemplate } from "../../FormTemplate";

export interface ValueInstallmentRegisterScreenTemplate extends ValueFormTemplate {
  installments_number: IInstallment["installments_number"];
}

interface InstallmentRegisterScreenTemplateProps {
  variant: TypeOfVariants
  submitAction: (data: ValueInstallmentRegisterScreenTemplate) => void
}

export default function InstallmentRegisterScreenTemplate({ variant, submitAction }: InstallmentRegisterScreenTemplateProps) {
  const labelRecurring = `Informe a quantidade de parcelas do ${getVariantText(variant)}` 
  
  const refInstallmentNumber = useRefInputInstallmentsNumber();

  const handleAction = (standard: ValueFormTemplate) => {
    const data_recurring = {
      ...standard,
      installments_number: refInstallmentNumber.installments_number.current
    } satisfies ValueInstallmentRegisterScreenTemplate
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