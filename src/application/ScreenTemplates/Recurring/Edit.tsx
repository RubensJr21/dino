import { EditRecurringScreenParams } from "@src/application/types/screens/RecurringScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import InputRecurring, { useRefInputRecurring } from "../../components/Input/InputRecurring";
import FormEditTemplate from "../Form/FormEditTemplate";

interface RecurringEditScreenTemplateProps {
  variant: 'receipt' | 'payment';
  value: EditRecurringScreenParams;
  submitAction: (data: EditRecurringScreenParams) => void;
}

export default function RecurringEditScreenTemplate({ variant, value, submitAction }: RecurringEditScreenTemplateProps) {
  const {
    recurring,
    ...value_standard
  } = value

  const refRecurring = useRefInputRecurring(recurring);

  const handleAction = (standard: EditStandardScreenParams) => {
    const data_recurring = {
      ...standard,
      recurring: refRecurring.value.current
    } satisfies EditRecurringScreenParams
    submitAction(data_recurring)
  }

  return (
    <FormEditTemplate
      {...{ variant }}
      value={value_standard}
      submitAction={handleAction}
      formExtension={<InputRecurring {...{ refRecurring }} />}
    />
  );
}