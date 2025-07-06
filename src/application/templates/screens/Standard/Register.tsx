import { EditStandardScreenParams as RegisterParams } from "@src/application/types/screens/StandardScreenParams";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormTemplate from "../../FormTemplate";

interface StandardRegisterScreenTemplateProps {
  variant: TypeOfVariants
  submitAction: (params: RegisterParams) => void
}

export default function StandardRegisterScreenTemplate({ variant, submitAction }: StandardRegisterScreenTemplateProps) {
  const handleAction = (standard: RegisterParams) => {
    submitAction(standard)
  }

  return (
    <FormTemplate
      {...{ variant }}
      submitAction={handleAction}
    />
  );
}