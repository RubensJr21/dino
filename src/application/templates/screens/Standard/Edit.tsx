import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormTemplate, { ValueFormEditTemplate } from "../../FormEditTemplate";

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
    <FormTemplate
      {...{ variant }}
      value={value}
      submitAction={handleAction}
    />
  );
}