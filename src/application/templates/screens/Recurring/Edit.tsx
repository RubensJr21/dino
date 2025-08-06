import { IRecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { ITag } from "@src/core/entities/tag.entity";
import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import InputRecurring, { useRefInputRecurringPicker } from "../../../components/Input/InputRecurringPicker";
import FormEditTemplate, { ValueFormEditTemplate } from "../../FormEditTemplate";
import { getVariantText } from "../../FormRegisterTemplate";

export interface ValueRecurringEditScreenTemplate extends ValueFormEditTemplate {
  id: number;
  description: string;
  cashflow_type: TypeOfVariants;
  scheduled_at: Date;
  amount: number;
  was_processed: boolean;
  transfer_method_id: ITransferMethod["id"];
  tag_description: ITag["description"];

  recurrence_type: IRecurrenceType["type"];
}

interface RecurringEditScreenTemplateProps {
  variant: TypeOfVariants;
  value: ValueRecurringEditScreenTemplate;
  submitAction: (data: ValueRecurringEditScreenTemplate) => void;
}

export default function RecurringEditScreenTemplate({ variant, value, submitAction }: RecurringEditScreenTemplateProps) {
  const {
    recurrence_type,
    ...value_standard
  } = value

  const labelRecurring = `Selecione o tipo de recorrência do ${getVariantText(variant)}` 

  const refRecurring = useRefInputRecurringPicker(recurrence_type);

  const handleAction = (standard: ValueFormEditTemplate) => {
    const data_recurring = {
      ...standard,
      recurrence_type: refRecurring.value.current
    } satisfies ValueRecurringEditScreenTemplate
    submitAction(data_recurring)
  }

  return (
    <FormEditTemplate
      {...{ variant }}
      value={value_standard}
      submitAction={handleAction}
      formExtension={<InputRecurring label={labelRecurring} {...{ refRecurring }} />}
    />
  );
}