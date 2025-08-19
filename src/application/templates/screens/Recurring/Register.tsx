import RecurringDropdown, { useRefRecurringDropdown } from "@src/application/components/RecurringDropdown";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormRegisterTemplate, { getVariantText, ValueFormRegisterTemplate } from "../../FormRegisterTemplate";

export interface ValueRecurringRegisterScreenTemplate extends ValueFormRegisterTemplate {
  recurrence_type: string;
}

interface RecurringRegisterScreenTemplateProps {
  variant: TypeOfVariants;
  submitAction: (data: ValueRecurringRegisterScreenTemplate) => void
}

export default function RecurringRegisterScreenTemplate({ variant, submitAction }: RecurringRegisterScreenTemplateProps) {
  const labelRecurring = `Selecione o tipo de recorrência do ${getVariantText(variant)}`

  const refRecurringDropdown = useRefRecurringDropdown("monthly");

  const handleAction = (standard: ValueFormRegisterTemplate) => {
    const data_recurring = {
      ...standard,
      recurrence_type: refRecurringDropdown.selected.current
    } satisfies ValueRecurringRegisterScreenTemplate;
    submitAction(data_recurring)
  }

  return (
    <FormRegisterTemplate
      {...{ variant }}
      submitAction={handleAction}
      formExtension={<RecurringDropdown label={labelRecurring} {...{refRecurringDropdown}}/>}
    />
  );
}