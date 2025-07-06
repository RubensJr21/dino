import { EditRecurringScreenParams as RegisterParams } from "@src/application/types/screens/RecurringScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import InputRecurring, { useRefInputRecurringPicker } from "../../../components/Input/InputRecurringPicker";
import FormTemplate, { getVariantText } from "../../FormTemplate";

interface RecurringRegisterScreenTemplateProps {
  variant: TypeOfVariants;
  submitAction: (data: RegisterParams) => void
}

export default function RecurringRegisterScreenTemplate({ variant, submitAction }: RecurringRegisterScreenTemplateProps) {
  const labelRecurring = `Selecione o tipo de recorrência do ${getVariantText(variant)}` 
  
  const refRecurring = useRefInputRecurringPicker("monthly");

  const handleAction = (standard: EditStandardScreenParams) => {
    const data_recurring = {
      ...standard,
      recurring: refRecurring.value.current
    } satisfies RegisterParams
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