import InputInstallmentsNumber, { useRefInputInstallmentsNumber } from "@src/application/components/Input/InputInstallmentsNumber";
import { EditInstallmentScreenParams } from "@src/application/types/screens/InstallmentScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormTemplate, { getVariantText } from "../../FormTemplate";

interface InstallmentEditScreenTemplateProps {
  variant: TypeOfVariants;
  value: EditInstallmentScreenParams;
  submitAction: (data: EditInstallmentScreenParams) => void;
}

export default function InstallmentEditScreenTemplate({ variant, value, submitAction }: InstallmentEditScreenTemplateProps) {
  const {
    installments_number,
    ...value_standard
  } = value

    const labelRecurring = `Informe a quantidade de parcelas do ${getVariantText(variant)}` 
    
    const refInstallmentNumber = useRefInputInstallmentsNumber(installments_number);

  const handleAction = (standard: EditStandardScreenParams) => {
    const data_recurring = {
      ...standard,
      installments_number: refInstallmentNumber.installments_number.current
    } satisfies EditInstallmentScreenParams
    submitAction(data_recurring)
  }

  return (
    <FormTemplate
      {...{ variant }}
      value={value_standard}
      submitAction={handleAction}
      formExtension={<InputInstallmentsNumber label={labelRecurring} {...{ refInstallmentNumber }} />}
    />
  );
}