import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import { RecurrencesAvailable } from "@src/core/start_configs";
import InputRecurring, { useRefInputRecurringPicker } from "../../../components/Input/InputRecurringPicker";
import FormRegisterTemplate, { getVariantText, ValueFormRegisterTemplate } from "../../FormRegisterTemplate";

export interface ValueRecurringRegisterScreenTemplate extends ValueFormRegisterTemplate {
  recurrence_type: RecurrencesAvailable;
}

interface RecurringRegisterScreenTemplateProps {
  variant: TypeOfVariants;
  submitAction: (data: ValueRecurringRegisterScreenTemplate) => void
}

export default function RecurringRegisterScreenTemplate({ variant, submitAction }: RecurringRegisterScreenTemplateProps) {
  const labelRecurring = `Selecione o tipo de recorrência do ${getVariantText(variant)}` 
  
  const refRecurring = useRefInputRecurringPicker("monthly");

  const handleAction = (standard: ValueFormRegisterTemplate) => {
    const data_recurring = {
      ...standard,
      recurrence_type: refRecurring.value.current
    } satisfies ValueRecurringRegisterScreenTemplate;
    submitAction(data_recurring)
  }

  return (
    <FormRegisterTemplate
      {...{ variant }}
      submitAction={handleAction}
      formExtension={<InputRecurring label={labelRecurring} {...{ refRecurring }} />}
    />
  );
}