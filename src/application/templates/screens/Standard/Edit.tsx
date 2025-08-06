import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormRegisterTemplate, { ValueFormEditTemplate } from "../../FormEditTemplate";

interface StandardEditScreenTemplateProps {
  variant: TypeOfVariants;
  value: ValueFormEditTemplate
  submitAction: (params: ValueFormEditTemplate) => void
}

export default function StandardEditScreenTemplate({ variant, value, submitAction }: StandardEditScreenTemplateProps) {
  const handleAction = (standard: ValueFormEditTemplate) => {
    submitAction(standard)
  }

  return (
    <FormRegisterTemplate
      {...{ variant }}
      value={value}
      submitAction={handleAction}
    />
  );
}