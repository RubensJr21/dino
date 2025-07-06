import { EditRecurringScreenParams as RegisterParams } from "@src/application/types/screens/RecurringScreenParams";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import InputRecurring, { useRefInputRecurring } from "../../components/Input/InputRecurring";
import FormRegisterTemplate from "../Form/FormRegisterTemplate";

interface RecurringRegisterScreenTemplateProps {
  variant: 'receipt' | 'payment'
  submitAction: (data: RegisterParams) => void
}

export default function RecurringRegisterScreenTemplate({ variant, submitAction }: RecurringRegisterScreenTemplateProps) {
  const refRecurring = useRefInputRecurring("monthly");

  const handleAction = (standard: EditStandardScreenParams) => {
    const data_recurring = {
      ...standard,
      recurring: refRecurring.value.current
    } satisfies RegisterParams
    submitAction(data_recurring)
  }

  return (
    <FormRegisterTemplate
      {...{ variant }}
      submitAction={handleAction}
      formExtension={<InputRecurring {...{ refRecurring }} />}
    />
  );
}