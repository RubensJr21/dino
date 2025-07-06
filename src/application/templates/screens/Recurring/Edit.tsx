import { EditRecurringScreenParams } from "@src/application/types/screens/RecurringScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import InputRecurring, { useRefInputRecurringPicker } from "../../../components/Input/InputRecurringPicker";
import FormTemplate, { getVariantText } from "../../FormTemplate";

interface RecurringEditScreenTemplateProps {
  variant: TypeOfVariants;
  value: EditRecurringScreenParams;
  submitAction: (data: EditRecurringScreenParams) => void;
}

export default function RecurringEditScreenTemplate({ variant, value, submitAction }: RecurringEditScreenTemplateProps) {
  const {
    recurring,
    ...value_standard
  } = value

  const labelRecurring = `Selecione o tipo de recorrência do ${getVariantText(variant)}` 

  const refRecurring = useRefInputRecurringPicker(recurring);

  const handleAction = (standard: EditStandardScreenParams) => {
    const data_recurring = {
      ...standard,
      recurring: refRecurring.value.current
    } satisfies EditRecurringScreenParams
    submitAction(data_recurring)
  }

  return (
    <FormTemplate
      {...{ variant }}
      value={value_standard}
      submitAction={handleAction}
      formExtension={<InputRecurring label={labelRecurring} {...{ refRecurring }} />}
    />
  );
}