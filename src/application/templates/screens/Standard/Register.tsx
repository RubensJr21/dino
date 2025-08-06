import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormTemplate, { ValueFormTemplate } from "../../FormTemplate";

interface StandardRegisterScreenTemplateProps {
  variant: TypeOfVariants
  submitAction: (params: ValueFormTemplate) => void
}

export default function StandardRegisterScreenTemplate({ variant, submitAction }: StandardRegisterScreenTemplateProps) {
  const handleAction = (standard: ValueFormTemplate) => {
    submitAction(standard)
  }

  return (
    <FormTemplate
      {...{ variant }}
      submitAction={handleAction}
    />
  );
}