import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import FormEditTemplate from "../Form/FormEditTemplate";

interface StandardEditScreenTemplateProps {
  variant: 'receipt' | 'payment'
  value: EditStandardScreenParams
  submitAction: (params: EditStandardScreenParams) => void
}

export default function StandardEditScreenTemplate({ variant, value, submitAction }: StandardEditScreenTemplateProps) {
  const handleAction = (standard: EditStandardScreenParams) => {
    submitAction(standard)
  }

  return (
    <FormEditTemplate
      {...{ variant }}
      value={value}
      submitAction={handleAction}
    />
  );
}