import InputInstallmentsNumber, { useRefInputInstallmentsNumber } from "@src/application/components/Input/InputInstallmentsNumber";
import { IInstallment } from "@src/core/entities/installment.entity";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormEditTemplate, { ValueFormEditTemplate } from "../../FormEditTemplate";
import { getVariantText } from "../../FormTemplate";

export interface ValueInstallmentEditScreenTemplate extends ValueFormEditTemplate {
  installments_number: IInstallment["installments_number"];
}

interface InstallmentEditScreenTemplateProps {
  variant: TypeOfVariants;
  value: ValueInstallmentEditScreenTemplate;
  submitAction: (data: ValueInstallmentEditScreenTemplate) => void;
}

export default function InstallmentEditScreenTemplate({ variant, value, submitAction }: InstallmentEditScreenTemplateProps) {
  const {
    installments_number,
    ...value_standard
  } = value

    const labelRecurring = `Informe a quantidade de parcelas do ${getVariantText(variant)}` 
    
    const refInstallmentNumber = useRefInputInstallmentsNumber(installments_number);

  const handleAction = (standard: ValueFormEditTemplate) => {
    const data_recurring = {
      ...standard,
      installments_number: refInstallmentNumber.installments_number.current
    } satisfies ValueInstallmentEditScreenTemplate
    submitAction(data_recurring)
  }

  return (
    <FormEditTemplate
      {...{ variant }}
      value={value_standard}
      submitAction={handleAction}
      formExtension={<InputInstallmentsNumber label={labelRecurring} {...{ refInstallmentNumber }} />}
    />
  );
}