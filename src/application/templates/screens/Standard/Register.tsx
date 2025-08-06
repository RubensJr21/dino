import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormRegisterTemplate, { ValueFormRegisterTemplate } from "../../FormRegisterTemplate";

interface StandardRegisterScreenTemplateProps {
  variant: TypeOfVariants
  submitAction: (params: ValueFormRegisterTemplate) => void
}

export default function StandardRegisterScreenTemplate({ variant, submitAction }: StandardRegisterScreenTemplateProps) {
  const handleAction = (standard: ValueFormRegisterTemplate) => {
    submitAction(standard)
  }

  return (
    <FormRegisterTemplate
      {...{ variant }}
      submitAction={handleAction}
    />
  );
}