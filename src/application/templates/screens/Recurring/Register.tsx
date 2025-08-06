import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import { RecurrencesAvailable } from "@src/core/start_configs";
import InputRecurring, { useRefInputRecurringPicker } from "../../../components/Input/InputRecurringPicker";
import FormTemplate, { getVariantText, ValueFormTemplate } from "../../FormTemplate";

export interface ValueRecurringRegisterScreenTemplate extends ValueFormTemplate {
  recurrence_type: RecurrencesAvailable;
}

interface RecurringRegisterScreenTemplateProps {
  variant: TypeOfVariants;
  submitAction: (data: ValueRecurringRegisterScreenTemplate) => void
}

export default function RecurringRegisterScreenTemplate({ variant, submitAction }: RecurringRegisterScreenTemplateProps) {
  const labelRecurring = `Selecione o tipo de recorrência do ${getVariantText(variant)}` 
  
  const refRecurring = useRefInputRecurringPicker("monthly");

  const handleAction = (standard: ValueFormTemplate) => {
    const data_recurring = {
      ...standard,
      recurrence_type: refRecurring.value.current
    } satisfies ValueRecurringRegisterScreenTemplate;
    submitAction(data_recurring)
  }

  return (
    <FormTemplate
      {...{ variant }}
      submitAction={handleAction}
      formExtension={<InputRecurring label={labelRecurring} {...{ refRecurring }} />}
    />
  );
}