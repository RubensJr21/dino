import { EditInstallmentScreenParams } from "@src/application/types/screens/InstallmentScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import FormEditTemplate from "../Form/FormEditTemplate";

interface InstallmentEditScreenTemplateProps {
  variant: 'receipt' | 'payment';
  value: EditInstallmentScreenParams;
  submitAction: (data: EditInstallmentScreenParams) => void;
}

export default function InstallmentEditScreenTemplate({ variant, value, submitAction }: InstallmentEditScreenTemplateProps) {
  const {
    ...value_standard
  } = value

  const handleAction = (standard: EditStandardScreenParams) => {
    const data_recurring = {
      ...standard,
    } satisfies EditInstallmentScreenParams
    submitAction(data_recurring)
  }

  return (
    <FormEditTemplate
      {...{ variant }}
      value={value_standard}
      submitAction={handleAction}
      formExtension={
        // TODO: Criar elemento de selecionar quantidade de parcelas. Elemento simples que permite digitar o número ou pressionar botão de mais e menos
        // <InputInstallmentsNumber />
        undefined
      }
    />
  );
}