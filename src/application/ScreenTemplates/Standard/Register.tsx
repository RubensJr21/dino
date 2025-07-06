import { EditStandardScreenParams as RegisterParams } from "@src/application/types/screens/StandardScreenParams";
import FormRegisterTemplate from "../Form/FormRegisterTemplate";

interface StandardRegisterScreenTemplateProps {
  variant: 'receipt' | 'payment'
  submitAction: (params: RegisterParams) => void
}

export default function StandardRegisterScreenTemplate({ variant, submitAction }: StandardRegisterScreenTemplateProps) {
  const handleAction = (standard: RegisterParams) => {
    submitAction(standard)
  }

  return (
    <FormRegisterTemplate
      {...{ variant }}
      submitAction={handleAction}
    />
  );
}