import InputInstallmentsNumber, { useRefInputInstallmentsNumber } from "@src/application/components/Input/InputInstallmentsNumber";
import { IInstallment } from "@src/core/entities/installment.entity";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormRegisterTemplate, { getVariantText, ValueFormRegisterTemplate } from "../../FormRegisterTemplate";

export interface ValueInstallmentRegisterScreenTemplate extends ValueFormRegisterTemplate {
  installments_number: IInstallment["installments_number"];
}

interface InstallmentRegisterScreenTemplateProps {
  variant: TypeOfVariants
  submitAction: (data: ValueInstallmentRegisterScreenTemplate) => void
}

export default function InstallmentRegisterScreenTemplate({ variant, submitAction }: InstallmentRegisterScreenTemplateProps) {
  const labelRecurring = `Informe a quantidade de parcelas do ${getVariantText(variant)}` 
  
  const refInstallmentNumber = useRefInputInstallmentsNumber();

  const handleAction = (standard: ValueFormRegisterTemplate) => {
    const data_recurring = {
      ...standard,
      installments_number: refInstallmentNumber.installments_number.current
    } satisfies ValueInstallmentRegisterScreenTemplate
    submitAction(data_recurring)
  }
  
  return (
    <FormRegisterTemplate
      {...{ variant }}
      submitAction={handleAction}
      formExtension={<InputInstallmentsNumber label={labelRecurring} {...{ refInstallmentNumber }} />}
    />
  );
}